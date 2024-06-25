import { configureAppServer } from "@friendsofshopware/app-server/framework/hono";
import { CloudflareShopRepository } from "@friendsofshopware/app-server/service/cloudflare-workers";
import { Hono } from "hono";
import type {
	AppServer,
	Context,
	ShopInterface,
} from "@friendsofshopware/app-server";
import { createNotificationResponse } from "@friendsofshopware/app-server/helper/app-actions";
import axios from 'axios';
import { env } from 'cloudflare:test';

type Bindings = {
	db: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()




declare module "hono" {
	interface ContextVariableMap {
		app: AppServer;
		shop: ShopInterface;
		context: Context;
	}
}

configureAppServer(app, {
	appName: 'DKL',
	appSecret: 'dkl',
	shopRepository: (ctx) => {
		return new CloudflareShopRepository(ctx.env.shopStorage);
	}
})

app.post('/app/action-button/product', async ctx => {
	console.log(`Got request from Shop ${ctx.get('shop').getShopId()}`)
	return createNotificationResponse('success', 'YEAA');
});

app.get('/app/list', async ctx => {
	const query = `
		SELECT order_number, customer_name, customer_type
		FROM order_customer`;

	const result = await ctx.env.db.prepare(query).all();
	return new Response(JSON.stringify(result), {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
	});
});

app.post('/app/order-placed', async ctx => {
	const payload = ctx.get('context').payload;
	const order = payload.data.payload.order.orderNumber;
	const customer = payload.data.payload.order.orderCustomer.firstName + ' ' + payload.data.payload.order.orderCustomer.lastName;
	const type = payload.data.payload.order.orderCustomer.company ? 'Company' : 'Person';

	let data = JSON.stringify([
		{
			"type": "test",
			"data": {
				"name": "test"
			}
		}
	]);

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://sanctions.shyim.workers.dev',
		headers: {
			'Content-Type': 'application/json'
		},
		data : data
	};

	const res = await axios.request(config)
	if (res.data.hit) {
		const query = `
      INSERT INTO order_customer (order_number, customer_name, customer_type)
      VALUES (?, ?, ?)`;

			await ctx.env.db
			.prepare(query)
			.bind(order, customer, type)
			.run();
	}


	return createNotificationResponse('success', 'YEAA');
});

export default app;
