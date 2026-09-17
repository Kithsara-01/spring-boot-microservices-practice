package com.example.order_service.client;

import org.springframework.web.client.RestClient;
import org.springframework.stereotype.Component;

import org.springframework.web.client.HttpClientErrorException;

@Component
public class CustomerClient {

    private final RestClient restClient;

    public CustomerClient() {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:8080")
                .build();
    }

    public String getCustomerById(Long customerId) {

        try {
            return restClient.get()
                    .uri("/customers/" + customerId)
                    .retrieve()
                    .body(String.class);

        } catch (HttpClientErrorException.NotFound e) {
            return null;
        }
    }

    // public String getCustomerById(Long customerId) {

    // return restClient.get() //--------------------- get req ekka yawanna
    // .uri("/customers/" + customerId) //----- API PATH EKA
    // .retrieve() //------------------------- response eka ganna
    // .body(String.class); // ---------------- response eka string ekak widyata
    // ganna
    // }
}

// .baseurl = http://localhost:8080
// .url => yanna ona API address eka = customers/5
// .baseurl + .url = http://localhost:8080/customers/5
// restClient=http request yawanna springboot wlain dena class object ekak
// get() = get req ekak yawannna
// .uri("/customers/" + customerId) => .uri() kiyana method ekata argument
// pa/parameter value eka pas karala thiyenne me