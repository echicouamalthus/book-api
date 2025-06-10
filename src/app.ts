import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import { app as authRouter } from '@/src/routes/auth.route';
import { app as bookRouter } from '@/src/routes/book.route';

// import { Scalar } from '@scalar/hono-api-reference';

import packageJSON from '@/package.json';

const app = new OpenAPIHono({
	strict: true,
	defaultHook,
}).basePath('/api');

app.use(
	'*',
	cors({
		origin: 'http://localhost:9999/api',
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
	})
);

app.use('*', serveEmojiFavicon('🐻'));

app.notFound(notFound);
app.onError(onError);

app.route('/auth', authRouter);
app.route('/book', bookRouter);

app.doc('/doc', {
	openapi: '3.0.0',
	info: {
		title: 'Book Api Documentation',
		version: packageJSON.version,
		description: 'Book Api Documentation',
		contact: {
			name: 'Echicoua Elie Malthus',
			email: 'echicouamalthus@gmail.com',
		},
	},
});

app.get('/', async c => {
	return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});

// app.get(
// 	'/ui',
// 	Scalar({
// 		url: '/api/doc',
// 		theme: 'saturn',
// 		layout: 'modern',
// 	})
// );

export default app;