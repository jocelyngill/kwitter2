//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBQI_GGIkPugQ01Maw1Mc_UF9SWjhWbWwE",
      authDomain: "kwitter-79304.firebaseapp.com",
      databaseURL: "https://kwitter-79304-default-rtdb.firebaseio.com",
      projectId: "kwitter-79304",
      storageBucket: "kwitter-79304.appspot.com",
      messagingSenderId: "2968992888",
      appId: "1:2968992888:web:b4a5d12356a55a57c9018d"
    };
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>"+ name + "<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-primary' id=" +firebase_message_id+" value="+ like +" onclick='updateLike(this.id)'>"
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like + "</span></button><hr>";

row = name_with_tag + message_with_tag +like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();
function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : msg,
            like :0
      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}   
function updateLike(message_id)
{
      console.log("clicked on like button -" + message_id);
      button_id = message_id;
      like = document.getElementById(button_id).value;
      update_likes = Number(like) + 1; 
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : update_likes 
      });
}