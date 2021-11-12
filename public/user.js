
document.addEventListener("DOMContentLoaded",function(){

    //Grab user data and and to DOM 
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res =>res.json())
    .then(data =>{
    const table = document.querySelector(".user-table")
    
    data.forEach(element => {
        const userElement = document.createElement("div");
        userElement.style = " cursor: pointer"
        userElement.IsActive = false;

        const postContainer = document.createElement("div");
        postContainer.style =  "display: none; border: 2px solid red;"

        userElement.innerHTML = element.username;
        userElement.key = element.id
        userElement.className = `user${element.id}`

        table.appendChild(userElement)

        userElement.appendChild(postContainer)
        userElement.addEventListener('click', ()=>{
            toggle(userElement)
        })
    }); 
    })
    .catch((err) =>{console.log(err.message)})

    //Grab post and add them to user elements based on key
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data =>{
        
        data.forEach((post)=>{
            const userElement = document.querySelector('.user' + post.userId.toString());
            if(userElement)
            {
                const newPost = document.createElement('div')
                userElement.firstElementChild.appendChild(newPost)
                let postNumber = userElement.firstElementChild.children.length
                newPost.innerHTML ="Post " + postNumber + ": " + post.body;
                newPost.style =  "border: 1px solid red; margin: 2px"
            }
        })
    })
    .catch(err => console.log(err.message))
})

//Toggle displayed post of active/inactive users
function toggle(selectedElement)
{
    
    if(selectedElement.IsActive === true)
    {
        selectedElement.firstElementChild.style = "display: none"
        selectedElement.IsActive = false
        return;
    }
    else
    {
        selectedElement.firstElementChild.style = "display: block"
        selectedElement.IsActive = true;
    }

    const userElements = Array.prototype.slice.call( document.querySelector(".user-table").children )
    const inActiveElements = userElements.filter(ele => {return ele.key !== selectedElement.key} )
    
    inActiveElements.forEach((user)=> {
        user.IsActive = false
        
        user.firstElementChild.style = "display: none"
    })
}