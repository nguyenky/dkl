<script lang="ts">
import { ref, onMounted } from "vue";
import { MtDataTable } from "@shopware-ag/meteor-component-library";
import orderService from "./order.service";

export default {
    components: {
        MtDataTable,
    },

    setup() {
        const dataSourceValue = ref([]);

        async function fetchData() {
            console.log("fetching data");
            const data = await orderService.fetchOrders();
            dataSourceValue.value = data.results;

        }

				onMounted(async () => {
						await fetchData();
				});

        return {
            dataSourceValue
        };
    },
};
</script>

<template>
    <h1>Swag Workshop</h1>
    <h2>Vue 3 + Vite + TypeScript</h2>
    <table>
        <thead>
            <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in dataSourceValue" :key="data.id">
                <td>{{ data.order_number }}</td>
                <td>{{ data.customer_name }}</td>
                <td>{{ data.customer_type }}</td>
            </tr>
        </tbody>
    </table>
</template>
