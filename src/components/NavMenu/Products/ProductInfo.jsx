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
import { getProductinfoList } from "@/redux/slices/Products/GetProductInfoList";
const ProductInfo = () => {
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
    // width: "100%",
    padding: "9px",
    border: isDark ? "1px solid white" : "1px solid black",
  };
  const optionStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    border: isDark ? "1px solid white" : "1px solid black",
  };
  // ---applying custom styling
  const customStyles = {
    header: {
      // For Heading
      style: {
        minheight: "56px",
        color: isDark ? "white" : "green",
        fontSize: "24px",
        fontWeight: "bold",
        backgroundColor: isDark ? "#0F172A" : "",
        borderTopStyle: isDark ? "white" : "solid",
        // borderBottomStyle: isDark ? "white" : "solid",
        borderLeftStyle: isDark ? "white" : "solid",
        borderRightStyle: isDark ? "white" : "solid",
        borderWidth: "1px",
      },
    },
    subHeader: {
      style: {
        backgroundColor: isDark ? "#0F172A" : "",
        borderWidth: "1px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: isDark ? "white" : "solid",
        // borderBottomStyle: isDark ? "white" : "solid",
        borderLeftStyle: isDark ? "white" : "solid",
        borderRightStyle: isDark ? "white" : "solid",
        borderWidth: "1px",
        // backgroundColor: "green",
        color: isDark ? "white" : "",
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: isDark ? "#0F172A" : "",
      },
    },
    headCells: {
      style: {
        borderRightStyle: isDark ? "white" : "solid",
        borderLeftStyle: isDark ? "white" : "solid",
        borderTopStyle: isDark ? "white" : "solid",
        borderBottomStyle: isDark ? "white" : "solid",
        borderWidth: "1px",
        backgroundColor: isDark ? "#0F172A" : "",
        color: isDark ? "white" : "",

        //
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        borderRightStyle: isDark ? "white" : "solid",
        borderLeftStyle: isDark ? "white" : "solid",
        borderTopStyle: isDark ? "white" : "solid",
        borderBottomStyle: isDark ? "white" : "solid",
        borderWidth: "1px",
        fontSize: "12px",
        backgroundColor: isDark ? "#0F172A" : "",
        color: isDark ? "white" : "",
      },
    },
    pagination: {
      style: {
        backgroundColor: isDark ? "#0F172A" : "",
        color: isDark ? "white" : "",
      },
    },
  };
  const { productList } = useSelector((state) => state.Products);
  const { data } = useSelector((state) => state.GetProductInfoList);
  console.log(data, "data");

  //   useEffect(() => {
  //     dispatch(product())
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     setPending(false);
  //   }, [dispatch]);
  useEffect(() => {
    dispatch(getProductinfoList())
      .then((res) => console.log(res, "res"))
      .catch((error) => console.log(error, "error"));
  }, []);

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
  ];
  //------ setting records------
  const [records, setRecords] = useState("");
  useEffect(() => {
    setRecords(
      data?.data?.data?.map((item) => ({
        ...item,
        productName: item?.productId.productName,
        recoveryType: item?.productId?.recoveryType,
        rateOfInterest: item?.productId?.rateOfInterest,
        NoOfEmi: item?.productId?.NoOfEmi,
        // email: item?.email,
        // phone: item?.phone,
        // deletedAt: item?.deletedAt,
        id: item?._id,
      })) || {}
    );
  }, [data, setRecords]);

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
    console.log(perPage, "newperpage");
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
    <div className="w-full grid xl:grid-cols-3  gap-3  items-center justify-between">
      <div className="text-2xl text-start">Products Info</div>

      {/* Adding Drop Down of Branch list */}
      <div>
        <select
          // value={branchId}
          name="branchId"
          // label="State"
          // onChange={handleChange}
          // onKeyUp={handleValidation}
          style={optionStyle}
          className="h-10 mr-6 w-[200px] grid"
        >
          <option value="">Branch Id</option>
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
    navigate("/layout/add-employee");
  };

  return (
    <Card>
      <div className={`${isDark ? "bg-secondary-900   text-white" : ""}`}>
        <div className="text-end mb-4">
          <div className="flex gap-5 justify-between">
            <div>
              <Button
                type="submit"
                text="Add Product Info"
                className={`${
                  isDark
                    ? "btn bg-secondary-500  font-bold  text-black-500"
                    : "btn btn-dark"
                }   block text-center ml-5 mt-5`}
                onClick={handleAddAgent}
                // isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={keyWord === "" ? records : filterData}
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
    </Card>
  );
};

export default ProductInfo;
