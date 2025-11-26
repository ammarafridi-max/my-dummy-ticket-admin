import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { useJwtData } from '../../../services/jwt';

export default function Filter() {
  const [activeFilterBox, setActiveFilterBox] = useState('');
  const jwtData = useJwtData();

  return (
    <div className="flex justify-between mb-5">
      <div className="flex gap-2">
        <FilterTemplate
          id="createdAt"
          title="Submission"
          options={
            jwtData?.role.toLowerCase() === 'admin'
              ? [
                  { label: 'Last 6 Hours', value: '6_hours' },
                  { label: 'Last 12 Hours', value: '12_hours' },
                  { label: 'Last 24 Hours', value: '24_hours' },
                  { label: 'Last 7 Days', value: '7_days' },
                  { label: 'Last 14 Days', value: '14_days' },
                  { label: 'Last 30 Days', value: '30_days' },
                  { label: 'Last 90 Days', value: '90_days' },
                  { label: 'All Time', value: 'all_time' },
                ]
              : [{ label: 'Last 6 Hours', value: '6_hours' }]
          }
          searchParamsName="createdAt"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
        <FilterTemplate
          id="paymentStatus"
          title="Payment Status"
          options={[
            { label: 'All', value: 'all' },
            { label: 'Paid', value: 'PAID' },
            { label: 'Unpaid', value: 'UNPAID' },
          ]}
          searchParamsName="paymentStatus"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
        <FilterTemplate
          id="orderStatus"
          title="Order Status"
          options={[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Delivered', value: 'DELIVERED' },
          ]}
          searchParamsName="orderStatus"
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        />
      </div>
      <div className="flex gap-3">
        <Search />
        {/* <SortBy
          activeFilterBox={activeFilterBox}
          setActiveFilterBox={setActiveFilterBox}
        /> */}
      </div>
    </div>
  );
}

function FilterTemplate({
  id,
  title,
  options,
  searchParamsName,
  activeFilterBox,
  setActiveFilterBox,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [boxTitle, setBoxTitle] = useState(title);
  const isOpen = activeFilterBox === id;
  const ref = useRef(null);

  useEffect(() => {
    const paramValue = searchParams.get(searchParamsName);

    // if no param or invalid param, force-set default
    if (!paramValue || !options.some((o) => o.value === paramValue)) {
      const defaultOption = options[0];
      const newParams = new URLSearchParams(searchParams);
      newParams.set(searchParamsName, defaultOption.value);
      setSearchParams(newParams);
      setBoxTitle(`${title}: ${defaultOption.label}`);
      return;
    }

    // otherwise, display the correct label
    const selected = options.find((o) => o.value === paramValue);
    setBoxTitle(`${title}: ${selected?.label || paramValue}`);
  }, [searchParams, searchParamsName, options, setSearchParams, title]);

  return (
    <div className="relative w-fit" ref={ref}>
      <button
        className="w-fit min-w-[100px] bg-white text-[14px] py-1.5 px-5 rounded-md shadow-sm cursor-pointer"
        onClick={() => setActiveFilterBox(isOpen ? '' : id)}
      >
        {boxTitle}
      </button>
      {isOpen && (
        <div className="absolute bg-white w-full min-w-[200px] rounded-sm shadow-sm mt-2 overflow-hidden">
          {options?.map((option) => (
            <p
              key={option?.value}
              className="text-[14px] py-2 px-4 hover:bg-primary-500 cursor-pointer duration-300"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                if (option?.value?.toLowerCase() === 'all') {
                  newParams.delete(searchParamsName);
                } else {
                  newParams.set(searchParamsName, option?.value);
                }
                setSearchParams(newParams);
                setActiveFilterBox('');
                setBoxTitle(`${title}: ${option?.label}`);
              }}
            >
              {option?.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative">
      <input
        placeholder="Search..."
        type="text"
        className="w-fit min-w-[300px] bg-white text-[14px] py-1.5 px-5 rounded-md shadow-sm cursor-pointer outline-0"
        value={searchQuery}
        onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set('search', e.target.value);
          setSearchQuery(e.target.value);
          setSearchParams(newParams);
        }}
      />
      {searchParams.get('search') && (
        <MdClose
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('search');
            setSearchParams(newParams);
            setSearchQuery('');
          }}
          className="text-black absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      )}
    </div>
  );
}

function SortBy({ activeFilterBox, setActiveFilterBox }) {
  return (
    <FilterTemplate
      id="sort"
      title="Sort By"
      options={[{ label: 'Recently Submitted', value: 'recent' }]}
      searchParamsName="sort"
      activeFilterBox={activeFilterBox}
      setActiveFilterBox={setActiveFilterBox}
    />
  );
}
