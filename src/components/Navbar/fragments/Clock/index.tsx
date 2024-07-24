import { useClockStore } from '@/components/Navbar/contexts/clock';
import useTime from '@/components/Navbar/hooks/time';
import ClockSegment from '@/components/Navbar/fragments/ClockSegment';

export default function Clock() {
  useTime();

  return (
    <p className="trim-helvetiva-neue perspective-5000 w-max" id="clock">
      <SegmentHour />
      <span className="mx-[.2ch]">:</span>
      <SegmentMinute />
      <span className="mx-[.2ch]">:</span>
      <SegmentSecond />
      <span className="ml-[.5ch]">WIB</span>
    </p>
  );
}

function SegmentHour() {
  const hour = useClockStore((state) => state.hour);

  return <ClockSegment name="hour" segment={hour} />;
}

function SegmentMinute() {
  const minute = useClockStore((state) => state.minute);

  return <ClockSegment name="minute" segment={minute} />;
}

function SegmentSecond() {
  const second = useClockStore((state) => state.second);

  return <ClockSegment name="second" segment={second} />;
}
