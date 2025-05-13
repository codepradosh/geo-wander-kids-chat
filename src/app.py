import os, json, asyncio, httpx
from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

DEEPSEEK_API_KEY = "sk-f163d37f95804bfcb655b5b11cc8ee5e"
if not DEEPSEEK_API_KEY:
    raise RuntimeError("Set DEEPSEEK_API_KEY env var")

DEEPSEEK_BASE_URL = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1")
DEEPSEEK_MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")

TIMEOUT, RETRIES = 40, 3

class ChatRequest(BaseModel):
    query: str = Field(..., description="Any travel question or place name")

class ChatResponse(BaseModel):
    answer: str
    source_data: Dict[str, Any]

def _messages(q: str):
    system = (
        "You are GeoGuide, a friendly travel companion who answers descriptvely in 2000 words regarding query summary. "
        "Blend fun context with facts so that kids find it entertaining and make it more engaging answert."
        "Mandatory keys:\n"
        "  answer            – 1‑paragraph (2000 words), 2nd‑person, addressing the user’s question.\n"
        "  display_name      – official place name you’re talking about.\n"
        "  label             – 'city' or 'country'.\n"
        "  population        – integer or null.\n"
        "  lat, lon          – floats or null.\n"
        "  region            – continent or country code.\n"
        "  timezone          – main time zone.\n"
        "  contextual_label  – fun tag ('Beach Haven', 'Mountain Gateway', etc.).\n"
        "  nearby            – up to 5 nearby city names within ~100 km. Provide best curated guide to visit and flow to visit nearby places also mention main attraction in bullet points\n"
        "Return STRICT JSON only – no markdown, no commentary."
    )
    return [{"role": "system", "content": system}, {"role": "user", "content": q}]

async def _ask_deepseek(q: str) -> Dict[str, Any]:
    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": _messages(q),
        "max_tokens": 4096,
        "temperature": 0.7,
        "response_format": {"type": "json_object"},
    }
    headers = {"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"}
    exc: Optional[Exception] = None
    for attempt in range(RETRIES):
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as client:
                r = await client.post(f"{DEEPSEEK_BASE_URL}/chat/completions", json=payload, headers=headers)
                r.raise_for_status()
                txt = r.json()["choices"][0]["message"]["content"].strip()
                return json.loads(txt)
        except Exception as e:
            exc = e
            await asyncio.sleep(1 + attempt)
    raise HTTPException(503, detail=f"LLM error: {exc}")

app = FastAPI(title="GeoChatBot API (DeepSeek)")

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    q = req.query.strip()
    if not q:
        raise HTTPException(400, "Query cannot be empty")
    data = await _ask_deepseek(q)
    if "answer" not in data:
        raise HTTPException(502, "DeepSeek response malformed")
    return ChatResponse(answer=data.pop("answer"), source_data=data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("geochatbot_api:app", host="0.0.0.0", port=int(os.getenv("PORT", 8090)), reload=True)