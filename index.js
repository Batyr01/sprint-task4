// let users = [
//     {email: "batyr@mail.ru", password:"batyr007", fullName:"Batyrhan", country:"Kazakhstan", birthdate:"12.05.2004"}
// ];
function loadUsers(){
    let users = localStorage.getItem('users')
    if(users!=null){
        users = JSON.parse(users)
    }else{
        users = []
    }
    return users
}

function getCurrentUserInfo(email, password){
    let users = loadUsers()
    let currentUser = null
    for(let user of users){
        if(user.email === email && user.password === password){
            currentUser = user
        }
    }
    return currentUser
}

function addCurrentUser(email, password){
    let user = {email: email, password: password}
    user = JSON.stringify(user)
    localStorage.setItem("currentUser", user)
}

function register(){
    let emailInput = document.getElementById('email')
    let passwordInput = document.getElementById('password')
    let fullNameInput = document.getElementById('fullName')
    let countryInput = document.getElementById('country')
    let birthdateInput = document.getElementById('birthdate')
    let obj = {
        email: emailInput.value,
        password: passwordInput.value,
        fullName: fullNameInput.value,
        country: countryInput.value,
        birthdate: birthdateInput.value
    }
    let users = loadUsers()
    users.push(obj)
    localStorage.setItem("users", JSON.stringify(users))
    addCurrentUser(emailInput.value, passwordInput.value)
    window.location.href = "index.html"
}
function login(){
    let emailInput = document.getElementById('email')
    let passwordInput = document.getElementById('password')
    let users = loadUsers()
    let auth = false
    for(let user of users){
        if(user.email === emailInput.value && user.password === passwordInput.value){
            auth = true
        }
    }
    if(auth){
        addCurrentUser(emailInput.value, passwordInput.value)
        window.location.href = "index.html"
    }else{
        alert("Incorrect email or password")
    }
}

const link = document.getElementById('logout');
link.addEventListener('click', function(event) {
    event.preventDefault();
    delete(localStorage.currentUser)
    window.location.href = "login.html"
});

function showUserInfo(){
    let currentUser = JSON.parse(localStorage.currentUser)
    let user = getCurrentUserInfo(currentUser.email, currentUser.password)
    if(user != null){
        let userInfo = ""
        userInfo += "<div>"
        userInfo += "<p>EMAIL:</p>"
        userInfo += "<h4>"+user.email+"</h4>"
        userInfo += "</div>"
        userInfo += "<div>"
        userInfo += "<p>FULL NAME:</p>"
        userInfo += "<h4>"+user.fullName+"</h4>"
        userInfo += "</div>"
        userInfo += "<div>"
        userInfo += "<p>COUNTRY:</p>"
        userInfo += "<h4>"+user.country+"</h4>"
        userInfo += "</div>"
        userInfo += "<div>"
        userInfo += "<p>BIRTHDATE:</p>"
        userInfo += "<h4>"+user.birthdate+"</h4>"
        userInfo += "<div>"
        document.getElementById("form").innerHTML = userInfo
    }                        
}