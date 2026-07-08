import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col border border-primary-800 sm:flex-row sm:items-stretch">
      <div className="relative h-48 shrink-0 sm:h-auto sm:w-2/5">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-b border-primary-800 sm:border-b-0 sm:border-r"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="bg-primary-950 px-5 py-5 sm:px-7 sm:py-6">
          <h3 className="mb-3 text-2xl font-semibold text-accent-500">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 shrink-0 text-primary-600" />
            <p className="text-base text-primary-200 sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex flex-wrap items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-[350] sm:text-3xl">
                  ${regularPrice - discount}
                </span>
                <span className="text-sm font-semibold text-primary-600 line-through sm:text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-[350] sm:text-3xl">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="mt-auto bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block w-full border-primary-800 py-4 px-6 text-sm font-semibold transition-all hover:bg-accent-600 hover:text-primary-900 sm:w-auto sm:border-l sm:text-base"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
