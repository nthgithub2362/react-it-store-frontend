import axios from 'axios';
class OrderService {

    CreateInfo(info){
        return axios.post("http://localhost:8080/info_order",info);
    }
    CancelOrder(order,id_order){
        return axios.put("http://localhost:8080/order/"+id_order,order);
    }
    NoCancelOrder(order,id_order){
        return axios.put("http://localhost:8080/order-rehibilitate/"+id_order,order);
    }
    ListOrder(userid){
        return axios.get("http://localhost:8080/list_order"+'/'+userid);
    }
    getInfoOrder(id_order){
        return axios.get("http://localhost:8080/list_order/detail_order"+'/'+id_order);
    }
    ListOrderDetail(id_order){
        return axios.get("http://localhost:8080/list_order/list_product"+'/'+id_order);
    }
    deleteOrder(idor){
        return axios.delete("http://localhost:8080/info_order" + '/' + idor);
    }
    deleteOrderDetail(idor){
        return axios.delete("http://localhost:8080/order_detail" + '/' + idor);
    }
    ListAllOrder(page){
        return axios.get("http://localhost:8080/order-list?page=" +page)
    }
    ListOrderDetailProduct(page){
        return axios.get("http://localhost:8080/order-detail-product/" +page)
    }
    
    
}

export default new OrderService()