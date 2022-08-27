import axios from "axios";

class ContactService {
    CreateContact(contact){
        return axios.post("http://localhost:8080/contact",contact);
    }
    getContactNew(){
        return axios.get("http://localhost:8080/contact-new");
    }
}

export default new ContactService()