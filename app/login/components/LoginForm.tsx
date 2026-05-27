"use client";

import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
	companyCode: z
		.string()
		.min(2, "Company code is required")
		.max(32, "Company code is too long"),
	email: z.string().email("Enter a valid work email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const initialValues: LoginFormValues = {
	companyCode: "",
	email: "",
	password: "",
};

export default function LoginForm() {
	const [values, setValues] = useState<LoginFormValues>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
	const [statusMessage, setStatusMessage] = useState("");

	const handleChange = (field: keyof LoginFormValues, value: string) => {
		setValues((current) => ({ ...current, [field]: value }));
		setErrors((current) => ({ ...current, [field]: undefined }));
		setStatusMessage("");
	};

	return (
		<>
			<div className="mb-8">
				<h2 className="text-2xl font-semibold text-white">Login</h2>
				<p className="mt-2 text-sm text-slate-300">Use your company credentials to continue.</p>
			</div>

			<form
				className="space-y-5"
				onSubmit={(event) => {
					event.preventDefault();

					const result = loginSchema.safeParse(values);

					if (!result.success) {
						const fieldErrors: Partial<Record<keyof LoginFormValues, string>> = {};

						for (const issue of result.error.issues) {
							const field = issue.path[0] as keyof LoginFormValues | undefined;

							if (field && !fieldErrors[field]) {
								fieldErrors[field] = issue.message;
							}
						}

						setErrors(fieldErrors);
						setStatusMessage("");
						return;
					}

					setErrors({});
					setStatusMessage("Login validated. Connect this form to your ERP auth flow next.");
					console.log("Login payload:", result.data);
				}}
				noValidate
			>
				<div>
					<label htmlFor="companyCode" className="mb-2 block text-sm font-medium text-slate-200">
						Company code
					</label>
					<input
						id="companyCode"
						name="companyCode"
						value={values.companyCode}
						onChange={(event) => handleChange("companyCode", event.target.value)}
						placeholder="ERP-001"
						className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
					/>
					{errors.companyCode ? (
						<p className="mt-2 text-sm text-red-300">{errors.companyCode}</p>
					) : null}
				</div>

				<div>
					<label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
						Work email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						value={values.email}
						onChange={(event) => handleChange("email", event.target.value)}
						placeholder="name@company.com"
						className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
					/>
					{errors.email ? <p className="mt-2 text-sm text-red-300">{errors.email}</p> : null}
				</div>

				<div>
					<label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						value={values.password}
						onChange={(event) => handleChange("password", event.target.value)}
						placeholder="Enter your password"
						className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
					/>
					{errors.password ? (
						<p className="mt-2 text-sm text-red-300">{errors.password}</p>
					) : null}
				</div>

				<div className="flex items-center justify-between gap-4 text-sm text-slate-300">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="h-4 w-4 rounded border-white/20 bg-slate-950/60 text-cyan-500 focus:ring-cyan-400"
						/>
						Remember me
					</label>
					<a href="#" className="text-cyan-300 transition hover:text-cyan-200">
						Forgot password?
					</a>
				</div>

				<button
					type="submit"
					className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
				>
					Sign in to ERP
				</button>

				{statusMessage ? (
					<p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
						{statusMessage}
					</p>
				) : null}
			</form>
		</>
	);
}