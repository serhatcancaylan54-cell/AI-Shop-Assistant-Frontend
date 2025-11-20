(function () {
  // Script tag içinden mağaza ID'si alıyoruz
  const currentScript = document.currentScript;
  const STORE_ID = currentScript.getAttribute("data-store");

  // Backend URL
  const API_URL = "https://unsealable-myron-turbanlike.ngrok-free.dev/api/ai";

  // -----------------------------
  // BUBBLE BUTONU OLUŞTUR
  // -----------------------------
  const bubble = document.createElement("div");
  bubble.id = "ai-bubble";
  bubble.style.position = "fixed";
  bubble.style.bottom = "20px";
  bubble.style.right = "20px";
  bubble.style.width = "60px";
  bubble.style.height = "60px";
  bubble.style.borderRadius = "50%";
  bubble.style.backgroundColor = "#6B4EFF";
  bubble.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  bubble.style.cursor = "pointer";
  bubble.style.display = "flex";
  bubble.style.alignItems = "center";
  bubble.style.justifyContent = "center";
  bubble.style.zIndex = "999999";
  bubble.style.color = "white";
  bubble.style.fontSize = "26px";
  bubble.textContent = "💬";

  document.body.appendChild(bubble);

  // -----------------------------
  // CHAT PENCERESİ OLUŞTUR
  // -----------------------------
  const chatBox = document.createElement("div");
  chatBox.id = "ai-chat-box";
  chatBox.style.position = "fixed";
  chatBox.style.bottom = "100px";
  chatBox.style.right = "20px";
  chatBox.style.width = "350px";
  chatBox.style.height = "450px";
  chatBox.style.background = "white";
  chatBox.style.borderRadius = "10px";
  chatBox.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
  chatBox.style.display = "none";
  chatBox.style.flexDirection = "column";
  chatBox.style.overflow = "hidden";
  chatBox.style.zIndex = "999999";

  chatBox.innerHTML = `
    <div style="background:#6B4EFF; color:white; padding:12px; font-weight:bold;">
      AI Shop Assistant
    </div>
    <div id="ai-messages" style="flex:1; padding:10px; overflow-y:auto; font-size:14px;"></div>
    <div style="padding:10px; border-top:1px solid #eee;">
      <input id="ai-input" 
             type="text" 
             placeholder="Mesaj yaz..." 
             style="width:100%; padding:8px; border-radius:6px; border:1px solid #ccc;"/>
    </div>
  `;
  document.body.appendChild(chatBox);

  const messagesDiv = chatBox.querySelector("#ai-messages");
  const input = chatBox.querySelector("#ai-input");

  // -----------------------------
  // BUBBLE TIKLANINCA AÇ/KAPAT
  // -----------------------------
  let open = false;
  bubble.onclick = () => {
    open = !open;
    chatBox.style.display = open ? "flex" : "none";
  };

  // -----------------------------
  // MESAJI GÖNDER
  // -----------------------------
  function addMessage(text, sender = "user") {
    const m = document.createElement("div");
    m.style.margin = "6px 0";
    m.style.padding = "8px";
    m.style.borderRadius = "6px";
    m.style.maxWidth = "80%";
    m.style.whiteSpace = "pre-wrap";

    if (sender === "user") {
      m.style.background = "#e8e8ff";
      m.style.alignSelf = "flex-end";
    } else {
      m.style.background = "#f2f2f2";
      m.style.alignSelf = "flex-start";
    }

    m.textContent = text;
    messagesDiv.appendChild(m);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const text = input.value.trim();
      if (!text) return;
      input.value = "";

      addMessage(text, "user");

      // AI API'ya gönder
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          storeId: STORE_ID
        })
      });

      const data = await res.json();
      addMessage(data.reply || "Cevap alınamadı.");
    }
  });
})();
