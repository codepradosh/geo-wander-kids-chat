import os, requests, streamlit as st, pandas as pd

st.set_page_config(page_title="GeoChatBot", page_icon="🌍", layout="wide")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8095").rstrip("/")
CHAT_ENDPOINT = f"{BACKEND_URL}/chat"

with st.sidebar:
    st.title("🌍 GeoChatBot")
    st.markdown("Chat with an AI tour guide about any place on Earth.")
    st.divider()
    st.caption("Powered by DeepSeek • Built with Streamlit")

st.header("Ask about any city or country ✈️")

col1, col2 = st.columns([2, 1], gap="large")

with col1:
    q = st.text_input("Where to?", placeholder="e.g. Best time to visit Kyoto", key="q")
    if st.button("Tell me about it", use_container_width=True) and q.strip():
        with st.spinner("GeoGuide is thinking…"):
            try:
                r = requests.post(CHAT_ENDPOINT, json={"query": q.strip()})
                r.raise_for_status()
                data = r.json()
            except Exception as e:
                st.error(f"❌ {e}")
                st.stop()

        st.success("Here you go!")
        st.markdown(f"### 🧑‍🎤 {data['answer']}")

        card = data["source_data"]
        facts = {
            "Latitude": card.get("lat"),
            "Longitude": card.get("lon"),
            "Population": card.get("population"),
            "Region": card.get("region"),
            "Timezone": card.get("timezone"),
        }
        facts_str = {k: ("—" if v in (None, "", 0) else str(v)) for k, v in facts.items()}
        st.subheader("Key facts")
        st.dataframe(pd.DataFrame(facts_str.items(), columns=["Field", "Value"]))

        nearby = card.get("nearby", [])
        if nearby:
            st.subheader("Nearby cities (≈100 km)")
            st.write(", ".join(nearby))

        if card.get("lat") and card.get("lon"):
            st.subheader("Map")
            st.map(pd.DataFrame({"lat": [card["lat"]], "lon": [card["lon"]]}), zoom=6)

with col2:
    st.image("https://source.unsplash.com/400x400/?travel", caption="Travel vibe", use_column_width=True)

st.divider(); st.caption("©️ 2025 GeoChatBot 🛠️")
