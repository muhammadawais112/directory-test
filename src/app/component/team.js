function TeamComponent(props) {
  const { business } = props;
  return (
    <section class="bg-white light:bg-gray-900 rounded-md">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 light:text-white">
            Our Team
          </h2>
          {/* <p class="font-light text-gray-500 lg:mb-16 sm:text-xl light:text-gray-400">
            Explore the whole collection of open-source web components and
            elements built with the utility classes from Tailwind
          </p> */}
        </div>
        <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {business.team?.map((team, index) => (
            <div
              key={index}
              class="items-start bg-gray-50 rounded-lg shadow sm:flex light:bg-gray-800 light:border-gray-700"
            >
              <div className="flex-shrink-0">
                <img
                  width="100px"
                  class="rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={
                    team?.image ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Bonnie Avatar"
                />
              </div>
              <div class="p-5">
                <h3 class="text-xl font-bold tracking-tight text-gray-900 light:text-white">
                  <a href="#">{team.name}</a>
                </h3>
                <span class="text-gray-500 light:text-gray-400">
                  {team.designation}
                </span>
                <p class="mt-3 mb-4 font-light text-gray-500 light:text-gray-400">
                  {team.description
                    .replace(/<[^>]*>?/gm, "")
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}
                  ...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamComponent;
