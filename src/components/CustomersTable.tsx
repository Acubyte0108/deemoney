import { Customer } from "./Work";
import { useMediaQuery } from "react-responsive";

type CustomersTableProps = {
  customers: Customer[];
  handleEditUser: (person: Customer) => void;
};

const CustomersTable = (props: CustomersTableProps) => {
  const { customers, handleEditUser } = props;

  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const isMobileScreen = useMediaQuery({ query: '(max-width: 639px)' })

  return (
    <>
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Email
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {customers.map((person, i) => (
          <tr key={i}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
              {person.firstName} {person.lastName}
              <dl className="font-normal">
                <dt className="sr-only">Title</dt>
                <dd className="mt-1 truncate text-gray-700">{person.title}</dd>
                <dt className="sr-only">Email</dt>
                <dd className="mt-1 truncate text-gray-500">
                  {person.country}
                </dd>
              </dl>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">{person.email}</td>
            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <span
                className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                onClick={() => handleEditUser(person)}
              >
                Edit
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default CustomersTable;
