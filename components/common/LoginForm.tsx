"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormProvider, useForm, SubmitHandler, Control } from "react-hook-form";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
	email: string;
	password: string;
};

const formSchema = z.object({
	email: z
		.string({ required_error: "E-mail é obrigatório" })
		.email({ message: "Formato de e-mail inválido" }),
	password: z
		.string({ required_error: "Senha é obrigatório" })
		.min(6, { message: "Senha deve ter no minímo 6 caracteres" }),
});

export function LoginForm() {
	const router = useRouter();
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const response = await fetch('api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		console.log("dasdasdsa", response)
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="max-w-md w-full p-8">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control as Control<FormData>}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="exemplo@mail.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control as Control<FormData>}
							name="password"
							render={({ field }) => (
								<FormItem className="mt-4">
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-4 w-full">
							Entrar
						</Button>
					</form>
				</FormProvider>
			</div>
			<Button variant="link" asChild>
				<Link className=" !text-blue-500" href="/register">
					Quero me cadastrar
				</Link>
			</Button>
		</div>
	);
}