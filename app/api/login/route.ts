import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const query = `mutation GenerateCustomerToken($email: String!, $password: String!) {
            generateCustomerToken(email: $email, password: $password) {
                token
            }
        }`;

    const body = await request.json() as { email: string, password: string };

    const response = await fetch("https://infityworks.shop/graphql", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query,
            variables: { email: body.email, password: body.password }
        })
    });

    const jsonResponse = await response.json();

    if (jsonResponse.data && jsonResponse.data.generateCustomerToken) {
        cookies().set('customerToken', jsonResponse.data.generateCustomerToken.token, {
            httpOnly: true,
            secure: true,
        });
        return Response.json({ allowed: true }, { status: 200 })
    } else {
        return Response.json({ allowed: false }, { status: 401 })
    }
}
