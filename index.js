import GetCustomer from "./scenarios/Get-Customer.js";
import GetAllCustomers from "./scenarios/Get-AllCustomers.js";
import { group, sleep } from "k6";


export default () => {
    group('Endpoint Get Customer - Controller Customer - OnionArchitecture.Api', () => {
        GetCustomer();
    });

    sleep(1);

    group('Endpoint Get All Customer - Controller Customer - OnionArchitecture.Api', () => {
        GetAllCustomers();
    });

    sleep(1);
}

