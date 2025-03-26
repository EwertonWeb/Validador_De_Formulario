let b7validator = {
    handlesubmit:(Event)=>{
        Event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        b7validator.clearErrors();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = b7validator.chekinput(input);
            if(check !== true) {
                send = false;
                b7validator.showError(input, check);
                
            }
        }

        if(send){
            form.submit();

        }
    },
    chekinput:(input) => {
        let rules = input.getAttribute('data-rules');
        
        if(rules !== null ) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDatails = rules[k].split('=');
                switch(rDatails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'campo nao pode ser vazio.';
                        }
                    break;
                    case'min':
                        if(input.value.length < rDatails[1]) {
                            return 'Campo tem que ter pelo menos '+rDatails[1]+' caracteres' ;
                        }
                    break;
                    case 'email':
                         if (input.value != '') {
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail Digitado é Invalido ';
                            }
                            
                         }


                   break;
                }
            }

        }
        return true;
    },
    showError:(input , error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);

    },
    clearErrors:() => {
        let inputs =form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style = '';
        }


        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};


let form =document.querySelector('.b7validator');
form.addEventListener('submit', b7validator.handlesubmit);