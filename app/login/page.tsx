import LoginForm from "./components/LoginForm";

export default function LoginPage() {

	return (
		<main className="min-h-screen bg-[radial-gradient(circle_at_top,#243b53_0%,#102033_38%,#07111d_100%)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
					<section className="relative flex flex-col justify-between gap-10 border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-12">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
								Atlas ERP
							</p>
							<h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
								Secure access for your operations team.
							</h1>
							<p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
								Sign in to manage inventory, finance, orders, and reporting from one place.
							</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-3">
							{[
								["Inventory", "Live stock visibility"],
								["Finance", "Approvals and ledgers"],
								["Reports", "Instant business insights"],
							].map(([title, description]) => (
								<div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
									<div className="text-sm font-semibold text-white">{title}</div>
									<div className="mt-1 text-sm text-slate-300">{description}</div>
								</div>
							))}
						</div>
					</section>

					<section className="p-8 sm:p-10 lg:p-12">
						<LoginForm />
					</section>
				</div>
			</div>
		</main>
	);
}
