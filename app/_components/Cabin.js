import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="mb-12 border border-primary-800 px-3 py-3 sm:px-6 lg:mb-24 lg:grid lg:grid-cols-[3fr_4fr] lg:gap-8 lg:px-10 xl:gap-20">
      <div className="relative mb-6 aspect-[4/3] overflow-hidden sm:mb-8 lg:mb-0 lg:aspect-auto lg:min-h-[320px] lg:scale-[1.05] lg:-translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="mb-4 bg-primary-950 p-4 pb-1 text-3xl font-black text-accent-100 sm:text-4xl lg:mb-5 lg:w-[150%] lg:translate-x-[-10%] lg:p-6 lg:text-5xl xl:text-7xl xl:translate-x-[-254px]">
          Cabin {name}
        </h3>

        <p className="mb-8 text-base text-primary-300 sm:text-lg lg:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 shrink-0 text-primary-600" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 shrink-0 text-primary-600" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="h-5 w-5 shrink-0 text-primary-600" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
