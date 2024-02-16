import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import "react-contexify/dist/ReactContexify.css";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import useDarkMode from "@/hooks/useDarkMode";
import Card from "@/components/ui/Card";
import { product } from "@/redux/slices/Products/Products";
import { filterProduct } from "@/redux/slices/Products/FilterProduct";
import { productPagination } from "@/redux/slices/Products/ProductPagination";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { softDeleteProduct } from "@/redux/slices/Products/SoftDeleteProduct";
import { productInActive } from "@/redux/slices/Products/ProductInActive";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { viewProduct } from "@/redux/slices/Products/ViewProduct";

const Products = () => {
  const { branchList } = useSelector((state) => state.branchSlice);
  const [pending, setPending] = useState(true);
  const [totalRows, setTotalRows] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const dispatch = useDispatch();

  const [isDark] = useDarkMode();
  const navigate = useNavigate();
  // ----Adding style in input ----
  const inputBoxStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
    height: "38px",
    borderRadius: "0.5rem",
  };
  const optionStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    border: isDark ? "1px solid white" : "1px solid black",
    borderRadius: "0.5rem",
  };
  // ---applying custom styling in data table -----------
  const customStyles = {
    header: {
      // For Heading
      style: {
        minheight: "56px",
        color: isDark ? "rgb(203 213 225 / var(--tw-text-opacity));" : "green",
        fontWeight: "bold",
        backgroundColor: isDark
          ? " rgb(30 41 59 / var(--tw-bg-opacity))"
          : "rgb(226 232 240 / var(--tw-bg-opacity))",
      },
    },
    subHeader: {
      style: {
        backgroundColor: isDark
          ? " rgb(30 41 59 / var(--tw-bg-opacity))"
          : "white",
        padding: "1.25rem",
        fontSize: "1.125rem",
        fontWeight: "500",
        lineHeight: "24px",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(15 23 42 / var(--tw-text-opacity))",
      },
    },
    headRow: {
      style: {
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",
        fontSize: "0.75rem",
        fontWeight: "bold",
        backgroundColor: isDark
          ? ""
          : "rgb(226 232 240 / var(--tw-bg-opacity))",
        // FontFamily: "Inter, sans-serif",
        lineHeight: "1rem",
        textTransform: "uppercase",
        textOpacity: "1",
        letterSpacing: "1px",
        textAlign: "center",
      },
    },
    // headcell
    headCells: {
      style: {
        backgroundColor: isDark ? "rgb(51 65 85 / var(--tw-bg-opacity))" : "",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",

        fontWeight: "bold",
        fontSize: "0.75rem",
        textAlign: "center",
        paddingTop: "20px",
        paddingBottom: "15px",
      },
    },
    cells: {
      style: {
        backgroundColor: isDark ? " rgb(30 41 59 / var(--tw-bg-opacity))" : "",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",
        fontSize: "0.875rem",
        padding: "1.25rem",
        // FontFamily: "Inter, sans-serif",
        lineHeight: "1rem",
        textTransform: "capitalize",
        textOpacity: "1",
        letterSpacing: "1px",
        textAlign: "center",
      },
    },
    selectableRows: {
      style: {
        backgroundColor: "red",
        color: "red",
      },
    },
    pagination: {
      style: {
        backgroundColor: isDark
          ? "rgb(30 41 59 / var(--tw-bg-opacity))"
          : "white",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",
        fontSize: "15px",
      },
    },
  };
  const { productList } = useSelector((state) => state.Products);

  useEffect(() => {
    dispatch(product())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setPending(false);
  }, [dispatch]);

  const handleView = (row) => {
    const id = row._id;
    console.log(id);
    dispatch(viewProduct(id))
    navigate("/layout/view-product", { state: { id } });
  };
  const handleEdit = (row) => {
    const id = row._id;
    console.log(id, "id");
    navigate("/layout/edit-product", { state: { id } });
  };
  const handleDelete = (row) => {
    const id = row._id;
    Swal.fire({
      title: `Are you Sure Want to Delete ${row.branchName} Branch`,
      icon: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(softDeleteProduct(id))
          .then((res) => {
            dispatch(product());
            console.log(res);
            toast.success(res.payload.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const handleInactive = (row) => {
    const id = row._id;
    const status = false;
    console.log(row);
    dispatch(productInActive({ id, status }))
      .then((res) => {
        dispatch(product());
        toast.success(res.payload.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleActive = (row) => {
    const id = row._id;
    let status = true;
    row.productStatus ? (status = false) : (status = true);
    dispatch(productInActive({ id, status }))
      .then((res) => {
        dispatch(product());
        toast.success(res.payload.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ------creating column ----------

  const columns = [
    {
      name: "productName",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Recovery Type",
      selector: (row) => row.recoveryType,
      sortable: true,
    },
    {
      name: "Rate Of Interest",
      selector: (row) => row.rateOfInterest,
    },
    {
      name: "No Of Emi",
      selector: (row) => row.NoOfEmi,
    },
    {
      name: "Status",
      sortable: true,

      selector: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25  ${
                row?.productStatus === true
                  ? "text-success-500 bg-success-500"
                  : ""
              } 
            ${
              row?.productStatus === false
                ? "text-warning-500 bg-warning-500"
                : ""
            }
           
            
             `}
              title={
                row?.productStatus === true
                  ? "Click to deactivate"
                  : "Click to activate"
              }
              onClick={() => handleActive(row)}
            >
              {row.productStatus === true ? "True" : "False"}
            </span>
          </span>
        );
      },
    },

    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex  space-x-3 rtl:space-x-reverse ">
            <Tooltip
              content="View"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleView(row)}
              >
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Tooltip
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleEdit(row)}
              >
                <Icon icon="heroicons:pencil-square" />
                {/* bolt-slash */}
              </button>
            </Tooltip>
            <Tooltip
              content=" Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleDelete(row)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
            {/* Active or Inactive */}
            {/* {row.productStatus ? (
              <Tooltip
                content="In Active"
                placement="top"
                arrow
                animation="shift-away"
                // theme="danger"
              >
                <button
                  className="action-btn"
                  type="button"
                  onClick={() => handleInactive(row)}
                >
                  <Icon icon="heroicons:bolt" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip
                content="Aactive"
                placement="top"
                arrow
                animation="shift-away"
                // theme="danger"
              >
                <button
                  className="action-btn"
                  type="button"
                  onClick={() => handleActive(row)}
                >
                  <Icon icon="heroicons:bolt-slash" />
                </button>
              </Tooltip>
            )} */}
          </div>
        );
      },
    },
  ];
  //------ setting records------
  const [records, setRecords] = useState("");
  useEffect(() => {
    setRecords(
      productList?.data?.listProducts?.map((item) => ({
        ...item,
        productName: item?.productName,
        recoveryType: item?.recoveryType,
        rateOfInterest: item?.rateOfInterest,
        NoOfEmi: item?.NoOfEmi,
        // email: item?.email,
        // phone: item?.phone,
        // deletedAt: item?.deletedAt,
        id: item?._id,
      })) || {}
    );
  }, [productList, setRecords]);

  // ---------filtering data after a search -------
  const [filterData, setFilterData] = useState();
  const [keyWord, setkeyWord] = useState("");
  const handleFilter = (e) => {
    let newkeyWord = e.target.value;
    setkeyWord(newkeyWord);
    setTimeout(() => {
      dispatch(filterProduct(newkeyWord))
        .then((res) => {
          console.log(res, "res");
          setFilterData(res.payload.data.listProducts);
        })
        .catch((error) => console.log(error, "error"));
    }, 1000);
  };

  // ----Applying Server-Side Pagination -------

  const [paginationData, setPaginationData] = useState(records);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await dispatch(
          productPagination({ page, keyWord, perPage })
        );
        const data = response.payload.data.listProducts;
        setPaginationData(data.filter((item) => item.deletedAt === null));
        setTotalRows(response.payload.data.count);
        setPending(false);
      } catch (error) {
        console.log(error);
        setPending(false);
      }
    };
    fetchData(page);
  }, [productList, setPaginationData]);

  // ------Performing Action when page change -----------
  const handlePageChange = (page) => {
    dispatch(productPagination({ page, keyWord, perPage }))
      .then((res) => {
        setPaginationData(res.payload.data.listEmployees);
        setPage(page);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ------Handling Action after the perPage data change ---------
  const handlePerRowChange = (perPage) => {
    dispatch(productPagination({ page, keyWord, perPage }))
      .then((res) => {
        setPaginationData(res.payload.data.listEmployees);
        setPerPage(perPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // -----Adding a Search Box ---------

  const subHeaderComponent = (
    <div className="w-full grid xl:grid-cols-2  gap-3  items-center justify-between">
      {/* <div className="text-2xl text-start">Products</div> */}

      {/* Adding Drop Down of Branch list */}
      <div>
        <select
          // value={branchId}
          name="branchId"
          // label="State"
          // onChange={handleChange}
          // onKeyUp={handleValidation}
          style={optionStyle}
          className="h-10 mr-6 w-[200px] grid pl-2"
        >
          <option value="">Branch Name</option>
          {branchList?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.branchVisibleName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          style={inputBoxStyle}
          onChange={handleFilter}
        />
      </div>
    </div>
  );
  const handleAddAgent = () => {
    console.log("clicked");
    navigate("/layout/edit-product");
  };
  const handleBack = () => {
    navigate("/layout/dashboard");
  };
  return (
    // <Card>
    <div className={`${isDark ? "bg-secondary-900   text-white" : ""}`}>
      <div className="text-end mb-4">
        <div className="flex gap-5 justify-between">
          <div>
            <Button
              type="button"
              text="Back"
              className={`${
                isDark
                  ? "btn bg-secondary-500  font-bold  text-black-500"
                  : "btn btn-dark"
              }  text-center ml-5 mt-5 py-2  rounded-lg`}
              onClick={handleBack}
            />
          </div>
          <div>
            <Button
              type="submit"
              text="Add Product"
              className={`${
                isDark
                  ? "btn bg-secondary-500  font-bold  text-black-500"
                  : "btn btn-dark"
              }   block text-center ml-5 mt-5 py-2  rounded-lg`}
              onClick={handleAddAgent}
              // isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={keyWord === "" ? paginationData : filterData}
        // data={data}
        highlightOnHover
        customStyles={customStyles}
        fixedHeader
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowChange}
        selectableRows
        pointerOnHover
        progressPending={pending}
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </div>
    // </Card>
  );
};

export default Products;
