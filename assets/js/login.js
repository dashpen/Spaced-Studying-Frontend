const url = "http://192.168.1.213:3000";

document
  .getElementById("loginForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    document.getElementById("loadingMessage").style.display = "block";

    fetch(url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        document.getElementById("loadingMessage").style.display = "none";
        console.log(response)
        if (!response.ok) {
            // Check if the response status is in the error messages
            if (errorMessages[response.status]) {
                const errorMessage = document.getElementById("errorMessage");
                errorMessage.textContent = errorMessages[response.status];
                errorMessage.style.display = "block";
            } else {
                throw new Error("Network response was not ok");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
        .then((data) => {
        if (data) {
          // Redirect to the dashboard or another page
        //   window.location.href = "/dashboard.html";
            const successMessage = document.getElementById("successMessage");
            successMessage.textContent = "Login successful!";
            successMessage.style.display = "block";
        } else {
          // Display an error message
          const errorMessage = document.getElementById("errorMessage");
          errorMessage.textContent = "Unknown error"
          errorMessage.style.display = "block";
        }
      }
      ) 
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

const errorMessages = {
    400: "Your username or password were invalid. Please try again.",
    401: "Invalid Password: The password you entered is incorrect.",
    404: "User does not exist. Please check your username.",
    429: "Too Many Requests: You have exceeded the number of allowed login attempts. Please try again later.",
    500: "The server encountered an error while processing your request. Please try again later."
}