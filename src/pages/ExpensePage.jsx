import Layout from "./../layout/layout";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ExpensePage = () => {
  let expense = JSON.parse(localStorage.getItem("EXPENSE")) || [];
  const [data, setData] = useState([]);
  let [FormObj, setFormObj] = useState({
    amount: "",
    discription: "",
  });
  let [showtotal, setTotal] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("EXPENSE"));
    if (storedData) {
      storeData(storedData);
    }
  }, [FormObj]);

  const storeData = (data) => {
    setData(data);
    setTotal(data.reduce((prev, next) => prev + Number(next.amount), 0));
  };

  const inputOnChange = (property, value) => {
    setFormObj((preObj) => ({
      ...preObj,
      [property]: value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!FormObj.amount) return;
    expense.push({
      ...FormObj,
      id: Date.now(),
    });
    localStorage.setItem("EXPENSE", JSON.stringify(expense));
    setFormObj({
      amount: "",
      discription: "",
    });
    toast.success("Expense data save success");
  };

  // remove item
  const removeItem = (id) => {
    expense = expense.filter((item) => item.id !== id);
    localStorage.setItem("EXPENSE", JSON.stringify(expense));
    storeData(expense);
    toast.info("Expense data delete success");
  };

  return (
    <Layout>
      <div className="sm:h-screen bg-[url('../pattern.svg')] bg-center">
        <div className="container mx-auto my-16 pt-10">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex justify-center rounded-xl">
              <div className="card w-full shadow-xl p-9 bg-rose-300 bg-opacity-25">
                <h1 className="text-center pb-4 font-bold italic">
                  Enter Expense Here
                </h1>
                <form onSubmit={formSubmit}>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Discription
                      </span>
                    </label>
                    <textarea
                      value={FormObj.discription}
                      onChange={(e) => {
                        inputOnChange("discription", e.target.value);
                      }}
                      className="textarea textarea-bordered h-24"
                      placeholder="Expense Description Here"
                    ></textarea>
                  </div>
                  <div className="form-control w-full pt-2">
                    <label className="label">
                      <span className="label-text font-semibold">Amount</span>
                    </label>
                    <input
                      value={FormObj.amount}
                      onChange={(e) => {
                        inputOnChange("amount", e.target.value);
                      }}
                      type="number"
                      placeholder="Expense Amount Here"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="card-actions justify-end pt-5">
                    <button className="btn btn-active btn-neutral">
                      Add Expense
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-center rounded-xl">
              <div className="card w-full shadow-xl p-9 bg-rose-300 bg-opacity-25">
                <h1 className="text-center pb-12 font-bold italic">
                  Expense List Here
                </h1>
                <div className="overflow-x-auto">
                  <table className="table table-xs">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Discription</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{item.discription}</td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={item.amount}
                                decimalScale={2}
                                fixedDecimalScale
                                thousandsGroupStyle="lakh"
                                thousandSeparator=","
                                prefix={"৳ "}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-xs btn-circle btn-outline"
                                onClick={() => {
                                  removeItem(item.id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="2" className="text-end">
                          Total
                        </th>
                        <th>
                          <NumericFormat
                            displayType="text"
                            value={showtotal}
                            decimalScale={2}
                            fixedDecimalScale
                            thousandsGroupStyle="lakh"
                            thousandSeparator=","
                            prefix={"৳ "}
                          />
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpensePage;
