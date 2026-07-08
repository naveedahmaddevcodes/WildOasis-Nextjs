"use client";

import { differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const { regularPrice, discount } = cabin;
  const { maxBookingLength } = settings;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const disabledDays = [
    { before: today },
    ...(bookedDates || []).map((date) => new Date(date)),
  ];

  const numNights =
    range.to && range.from ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex flex-col justify-between overflow-x-auto px-2 py-4 sm:px-4 lg:px-0 lg:py-0">
      <DayPicker
        className="place-self-center pt-4 sm:pt-8 lg:pt-12"
        mode="range"
        onSelect={setRange}
        selected={range}
        max={maxBookingLength}
        fromMonth={today}
        fromDate={today}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        showOutsideDays
        disabled={disabledDays}
      />

      <div className="mt-4 flex flex-col gap-3 bg-accent-500 px-4 py-4 text-primary-800 sm:px-6 lg:mt-0 lg:h-[72px] lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="flex flex-wrap items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="text-sm font-semibold text-primary-700 line-through sm:text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights ? (
            <>
              <p className="w-fit bg-accent-600 px-3 py-2 text-xl sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="text-base font-bold uppercase sm:text-lg">
                  Total
                </span>{" "}
                <span className="text-xl font-semibold sm:text-2xl">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="w-fit border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
