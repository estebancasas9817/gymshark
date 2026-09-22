export default function Loading() {
	return (
		<main className="animate-pulse">
			{/* =========================
          ACCOUNT / REWARDS HERO
      ========================== */}
			<section className="bg-[#dedede] overflow-hidden relative min-h-200">
				<div
					className="
            mx-auto
            min-h-145
            max-w-max
            px-16
            pt-14
            pb-0
            lg:grid
            lg:grid-cols-[1fr_1fr_1fr]
            lg:gap-10

            max-lg:flex
            max-lg:flex-col
            max-lg:items-center
            max-lg:px-16
            max-lg:pt-16
          "
				>
					{/* =========================
              LEFT - ACCOUNT
          ========================== */}
					<div className="flex flex-col lg:items-start mb-12 lg:pt-30 max-lg:items-center max-lg:text-center">
						{/* Name */}
						<div className="h-7 w-64 bg-[#cfcfcf]" />

						{/* Email */}
						<div className="mt-5 h-4 w-44 bg-[#cfcfcf]" />

						{/* Sign out */}
						<div className="mt-6 h-4 w-20 bg-[#cfcfcf]" />
					</div>

					{/* =========================
              CENTER - POINTS
          ========================== */}
					<div className="flex flex-col items-center lg:pt-0 lg:mt-15">
						{/* Points */}
						<div className="flex items-start">
							<div className="h-21 w-18.5 bg-[#cfcfcf]" />
							<div className="ml-1 mt-2 h-4 w-5 bg-[#cfcfcf]" />
						</div>

						{/* Progress */}
						<div
							className="
                mt-16
                flex
                w-58.75
                items-center
                justify-between
              "
						>
							<div className="h-3 w-16 bg-[#cfcfcf]" />
							<div className="h-3 w-24 bg-[#cfcfcf]" />
						</div>
					</div>

					{/* =========================
              RIGHT - BENEFITS
          ========================== */}
					<div
						className="
              flex flex-col
              lg:items-stretch
              lg:pt-1
              lg:mt-30
              max-lg:w-full
              max-lg:overflow-hidden
              mt-12
            "
					>
						{/* Title */}
						<div className="mb-3 flex justify-center">
							<div className="h-3 w-28 bg-[#cfcfcf]" />
						</div>

						{/* Benefits */}
						<div
							className="
                flex gap-1

                lg:flex-col

                max-lg:w-max
                max-lg:flex-row
              "
						>
							{[1, 2, 3].map((item) => (
								<div
									key={item}
									className="
                    flex
                    h-12
                    items-center
                    bg-[#cfcfcf]

                    lg:w-full
                    lg:px-5

                    max-lg:w-55
                    max-lg:flex-col
                    max-lg:justify-center
                    max-lg:gap-2
                  "
								>
									{/* Check */}
									<div className="h-3 w-3 rounded-full bg-[#bdbdbd]" />

									{/* Text */}
									<div
										className="
                      h-3 w-28 bg-[#bdbdbd]

                      lg:ml-6
                    "
									/>
								</div>
							))}
						</div>

						{/* Chevron */}
						<div className="mt-5 flex justify-center">
							<div
								className="
                  h-2
                  w-2
                  rotate-45
                  border-b-2
                  border-r-2
                  border-[#bdbdbd]
                "
							/>
						</div>
					</div>

					{/* =========================
              LARGE DISC PLACEHOLDER
          ========================== */}
					<div
						className="
    pointer-events-none
    absolute
    left-1/2
    -translate-x-1/2

    top-[360px]

    h-[600px]
    w-[600px]
    rounded-full
    bg-[#eeeeee]
    shadow-[inset_0_0_0_18px_#e2e2e2]

    max-lg:top-[570px]
    max-lg:h-[520px]
    max-lg:w-[520px]
  "
					>
						<div
							className="
                h-130
                w-130
                shrink-0
                rounded-full
                bg-[#eeeeee]
                shadow-[inset_0_0_0_18px_#e2e2e2]

                max-lg:h-107.5
                max-lg:w-107.5
              "
						/>
					</div>
				</div>
			</section>

			{/* =========================
          LOWER CONTENT
      ========================== */}
			<section
				className="
          bg-white
          px-16
          py-16

          max-md:px-8
          max-md:py-8
        "
			>
				<div
					className="
            mx-auto
            grid
            max-w-[1440px]
            grid-cols-2
            gap-6

            max-lg:grid-cols-1
          "
				>
					{/* =========================
              ORDERS
          ========================== */}
					<div
						className="
              min-h-[370px]
              bg-[#f7f7f7]
              p-8

              max-md:min-h-[330px]
              max-md:p-7
            "
					>
						{/* Title */}
						<div className="h-5 w-24 bg-[#dedede]" />

						{/* Empty/order illustration */}
						<div className="flex flex-col items-center">
							<div
								className="
                  mt-20
                  h-16
                  w-16
                  rounded
                  bg-[#dedede]
                "
							/>

							{/* Order text */}
							<div className="mt-6 h-4 w-28 bg-[#dedede]" />

							<div className="mt-3 h-3 w-64 bg-[#dedede]" />

							{/* Button */}
							<div className="mt-5 h-11 w-44 rounded-full bg-[#d2d2d2]" />
						</div>
					</div>

					{/* =========================
              RIGHT CARDS
          ========================== */}
					<div className="hidden md:flex flex-col gap-6">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="
                  flex
                  min-h-31.25
                  items-center
                  bg-[#f7f7f7]
                  px-8

                  max-md:min-h-28.75
                  max-md:px-6
                "
							>
								{/* Icon */}
								<div className="h-10 w-10 shrink-0 rounded bg-[#dedede]" />

								{/* Text */}
								<div className="ml-6 flex flex-1 flex-col gap-3">
									<div className="h-5 w-40 bg-[#dedede]" />
									<div className="h-3 w-72 max-w-full bg-[#dedede]" />
								</div>

								{/* Arrow */}
								<div
									className="
                    ml-6
                    h-3
                    w-3
                    rotate-45
                    border-b-2
                    border-r-2
                    border-[#c8c8c8]
                  "
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
