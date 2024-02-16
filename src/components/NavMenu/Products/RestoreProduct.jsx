import React, { useEffect, useState, useTransition } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useDarkMode from "@/hooks/useDarkMode";
import Card from "@/components/ui/Card";
import { getSoftDeletedProductsList } from "@/redux/slices/Products/GetSoftDeleteProductList";
import { restoreProduct } from "@/redux/slices/Products/RestoreProduct";
import { permanentDeleteProduct } from "@/redux/slices/Products/PermanentDeleteProduct";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
const RestoreProducts = () => {
  const [isDark] = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputBoxStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
    height: "38px",
    borderRadius: "0.25rem",
  };

  // ----applying custom style -------
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
        FontFamily: "Inter, sans-serif",
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
        FontFamily: "Inter, sans-serif",
        lineHeight: "1rem",
        // textTransform: "capitalize",
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
  const { deletedProductList } = useSelector(
    (state) => state.GetSoftDeleteProductList
  );
  // ----creating data --------
  useEffect(() => {
    dispatch(getSoftDeletedProductsList())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const location = useLocation();

  const handleView = (row) => {
    const id = row._id;
    const pathName = location.pathname;
    navigate("/layout/view-product", { state: { id } });
  };
  const handleRestore = (row) => {
    const id = row._id;
    dispatch(restoreProduct(id))
      .then((res) => {
        dispatch(getSoftDeletedProductsList());
        toast.success(res.payload.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePermanentDelete = (row) => {
    const id = row._id;
    Swal.fire({
      title: `Are you Sure Want to Permanent Delete ${row.branchName} Branch`,
      icon: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(permanentDeleteProduct(id))
          .then((res) => {
            dispatch(getSoftDeletedProductsList());
            toast.success(res.payload.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
              content="Restore"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleRestore(row)}
              >
                <Icon icon="heroicons:arrow-left-start-on-rectangle" />
              </button>
            </Tooltip>
            <Tooltip
              content="Permanent Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handlePermanentDelete(row)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const [records, setRecords] = useState("");
  useEffect(() => {
    setRecords(
      deletedProductList?.data?.listProducts?.map((item) => ({
        ...item,
        productName: item?.productName,
        recoveryType: item?.recoveryType,
        rateOfInterest: item?.rateOfInterest,
        NoOfEmi: item?.NoOfEmi,
        deletedAt: item?.deletedAt,
        id: item?._id,
      })) || {}
    );
  }, [setRecords, deletedProductList]);
  // -----Adding a Search Box ---------

  const subHeaderComponent = (
    <div className="w-full grid xl:grid-cols-2 md:grid-cols-1 md:text-start gap-3  items-center">
      <div className="table-heading text-start ">Deleted Products</div>
      <div className="grid lg:justify-end md:justify-start">
        {/* <input
          type="text"
          placeholder="Search..."
          style={inputBoxStyle}
          onChange={handleFilter}
        /> */}
      </div>
    </div>
  );

  return (
    // <Card>
    <div>
      <DataTable
        columns={columns}
        data={records}
        highlightOnHover
        customStyles={customStyles}
        fixedHeader
        pagination
        selectableRows
        pointerOnHover
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </div>
    // </Card>
  );
};

export default RestoreProducts;
