import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail } from "k6";

export let GetAllCustomerDuration = new Trend('get_all_customer_duration');
export let GetAllCustomerFailRate = new Rate('get_all_customer_fail_rate');
export let GetAllCustomerSuccessRate = new Rate('get_all_customer_success_rate');
export let GetAllCustomerReqs = new Rate('get_all_customer_reqs');

export default function () {
    let res = http.get('https://localhost:5001/api/Customer/GetAllCustomer');

    GetAllCustomerDuration.add(res.timings.duration);
    GetAllCustomerReqs.add(1);
    GetAllCustomerFailRate.add(res.status == 0 || res.status > 399);
    GetAllCustomerSuccessRate.add(res.status < 399);

    let durationMsg = 'Max Duration ${1000/1000}s'
    if (!check(res, {
        'max duration': (r) => r.timings.duration < 1000,
    })) {
        fail(durationMsg);
    }

    sleep(1);
} 
   