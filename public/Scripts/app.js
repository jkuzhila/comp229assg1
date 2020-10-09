// IIFE -- Immediately Invoked Function Expression
/* James Kuzhilaparambil Id:301119040  date 10/09/2020 */
(function(){

    function Start()
    {
        console.log("App Started...");

        if(document.title == "Contact")

        {
          let sendButton = document.getElementById("sendButton");
          let cancelButton = document.getElementById('cancelButton');
          let form = document.forms(0);

          sendButton.addEventListener("click"), (event) => (
              event.preventDefault();
              let fullName = document.getElementById("fullName").value;
              let contactNumber = document.getElementById("contactNumber").value;
              let emailAddress = document.getElementById("emailAddress").value;
              let message = document.getElementById("message").value;

              console.info(fullName: ${fullName}
              contactNumber: ${contactNumber}
              emailAddress: ${emailAddress}
              message: ${message}"
              );
              form.reset();
        }
    };

           cancelButton.addEventListener("click"), (event) => (
              event.preventDefault();
              if(confirm("Are you sure"))
        {
              location.href = "/home";
        }
    )
        };
    }
}

    window.addEventListener("load", Start);

})();