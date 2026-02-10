function start(){
  startCamera();
  getLocation();
  getDevice();
}

// Camera
function startCamera(){
  navigator.mediaDevices.getUserMedia({video:true})
  .then(stream=>{
    document.getElementById("video").srcObject = stream;
  })
  .catch(()=>{
    alert("Camera denied");
  });
}

// Location
function getLocation(){
  navigator.geolocation.getCurrentPosition(pos=>{
    alert(
      "Location:\n" +
      pos.coords.latitude + ", " +
      pos.coords.longitude
    );
  });
}

// Device info
function getDevice(){
  console.log(navigator.userAgent);
}
