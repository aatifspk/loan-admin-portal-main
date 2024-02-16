import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { branch } from "@/redux/slices/BranchSlice";
import DataTable from "react-data-table-component";
import "react-contexify/dist/ReactContexify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { filterBranch } from "@/redux/slices/FilterBranch";
import Button from "@/components/ui/Button";
import useDarkMode from "@/hooks/useDarkMode";
import { pagination } from "@/redux/slices/Pagination";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { softDeleteBranch } from "@/redux/slices/SoftDeleteBranchSlice";
import { toast } from "react-toastify";
import { inActiveBranch } from "@/redux/slices/InActiveBranch";
import Swal from "sweetalert2";
import noDataImage from "@/assets/images/all-img/no-data.png";
import { viewBranch } from "@/redux/slices/ViewBranch";
const Branches = () => {
  const { branchList } = useSelector((state) => state.branchSlice);
  const { branchesData, rowCount } = useSelector((state) => state.Pagination);
  const [pending, setPending] = useState(true);
  const [totalRows, setTotalRows] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const dispatch = useDispatch();

  const [isDark] = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  // ----Adding style in input ----
  const inputBoxStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
    height: "38px",
    borderRadius: "0.5rem",
  };
  const noDataStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    color: isDark
      ? "rgb(203 213 225 / var(--tw-text-opacity))"
      : "rgb(15 23 42 / var(--tw-text-opacity))",
  };
  const popupStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    color: isDark
      ? "rgb(203 213 225 / var(--tw-text-opacity))"
      : "rgb(15 23 42 / var(--tw-text-opacity))",
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

  // ------creating data from branchlist ------
  const data = branchList?.map((item) => ({
    ...item,
    branchName: item?.branchName,
    branchCode: item?.branchCode,
    city: item?.city,
    branchVisibleName: item?.branchVisibleName,
    contactEmail: item?.contactEmail,
    landlineNumber: item?.landlineNumber,
    phone: item?.phone,
    state: item?.state,
    country: item?.country,
    address: item?.address,
    GSTIN: item?.GSTIN,
    createdAt: item?.createdAt,
    locality: item?.locality,
    pinCode: item?.pinCode,
    openingDate: item?.openingDate,
    deletedAt: item?.deletedAt,
    _id: item?._id,
  }));
  //
  // -----fetcching data after the page is mounting ---------
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (branchList.length === 0) {
          // await dispatch(branch());
        }
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    // return () =>
    fetchData();
  }, []); //dependency branchList

  const handleView = (row) => {
    const id = row._id;
    const pathName = location.pathname;
    navigate("/layout/view-branch", { state: { id, pathName } });
    dispatch(viewBranch(id))
  };
  const handleEdit = (row) => {
    const id = row._id;
    navigate("/layout/edit-branch", { state: { id } });
  };
  const handleDelete = (row) => {
    const id = row._id;
    Swal.fire({
      title: `Are you Sure Want to Delete ${row.branchName} Branch`,
      icon: "error",
      showCloseButton: true,
      showCancelButton: true,
      customClass: {
        // isDark?():()
        popup: "sweet-alert-popup-dark-mode-style",
        //  "sweet-alert-popup-normal-mode-style",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(softDeleteBranch(id))
          .then((res) => {
            dispatch(branch());
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
    dispatch(inActiveBranch({ id, status }))
      .then((res) => {
        dispatch(branch());
        toast.success(res.payload.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleActive = (row) => {
    const id = row._id;
    let status = true;
    row.status ? (status = false) : (status = true);
    dispatch(inActiveBranch({ id, status }))
      .then((res) => {
        dispatch(branch());
        toast.success(res.payload.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  // -----creating columns
  const columns = [
    {
      name: "Branch Name",
      selector: (row) => row.branchName,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.contactEmail,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Status",
      sortable: true,

      selector: (row) => {
        return (
          <span
            className="block w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25  ${
                row?.status === true ? "text-success-500 bg-success-500" : ""
              } 
            ${row?.status === false ? "text-warning-500 bg-warning-500" : ""}
           
            
             `}
              title={
                row?.status === true
                  ? "Click to deactivate"
                  : "Click to activate"
              }
              onClick={() => handleActive(row)}
            >
              {row.status === true ? "Active" : "In Active"}
            </span>
            {<p>{hovered ? "hovered" : "not Hovered"}</p>}
          </span>
        );
      },
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex  space-x-1 rtl:space-x-reverse ">
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
            {/* {row.status ? (
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
  const [records, setRecords] = useState([]);
  useEffect(() => {
    setRecords(
      branchList?.map((item) => ({
        ...item,
        branchName: item?.branchName,
        branchCode: item?.branchCode,
        city: item?.city,
        branchVisibleName: item?.branchVisibleName,
        contactEmail: item?.contactEmail,
        landlineNumber: item?.landlineNumber,
        phone: item?.phone,
        state: item?.state,
        country: item?.country,
        address: item?.address,
        GSTIN: item?.GSTIN,
        createdAt: item?.createdAt,
        locality: item?.locality,
        pinCode: item?.pinCode,
        openingDate: item?.openingDate,
        deletedAt: item?.deletedAt,
        _id: item?._id,
      })) || []
      // .filter((item) => item.deletedAt === null)
    );
  }, []); //dependency branchList
  // ---------filtering data after a search -------
  const [filterData, setFilterData] = useState();
  const [keyWord, setkeyWord] = useState("");
  const handleFilter = (e) => {
    let newkeyWord = e.target.value;
    setkeyWord(newkeyWord);
    setTimeout(() => {
      dispatch(filterBranch(newkeyWord))
        .then((res) => {
          setFilterData(res.payload.data.listBranches);
        })
        .catch((error) => console.log(error, "error"));
    }, 1000);
  };
  const handleAddBranch = () => {
    navigate("/layout/addBranch");
  };

  //------ Applying server side Pagination------
  const [paginationData, setPaginationData] = useState(records);

  useEffect(() => {
    dispatch(pagination({ page, keyWord, perPage }));
  }, [branchList]); //dependency branchList

  useEffect(() => {
    setPaginationData(branchesData);
    setTotalRows(rowCount);
    setPending(false);
  }, [branchesData]);

  // ------Performing Action when page change -----------
  const handlePageChange = (page) => {
    dispatch(pagination({ page, keyWord, perPage }))
      .then((res) => {
        setPaginationData(res.payload.data.listBranches);
        setPage(page);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // -----Adding a Search Box ---------

  const subHeaderComponent = (
    <div className="w-full grid xl:grid-cols-2 md:grid-cols-1 md:text-start gap-3  items-center">
      <div className="table-heading text-start ">Branches</div>
      <div className="grid lg:justify-end md:justify-start">
        <input
          type="text"
          placeholder="Search..."
          style={inputBoxStyle}
          onChange={handleFilter}
        />
      </div>
    </div>
  );

  // ------Handling Action after the perPage data change ---------
  const handlePerRowChange = (perPage) => {
    dispatch(pagination({ page, keyWord, perPage }));
    setPerPage(perPage);
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
              text="Add Branch"
              className={`${
                isDark
                  ? "btn bg-secondary-500  font-bold  text-black-500"
                  : "btn btn-dark"
              }   block text-center ml-5 mt-5 py-2  rounded-lg`}
              onClick={handleAddBranch}
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={keyWord === "" ? paginationData : filterData}
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
        noDataComponent={
          <div>
            <p className="text-center text-bold text-2xl" style={noDataStyle}>
              No data Found
            </p>
            <img src={noDataImage} alt="No Data Image" style={noDataStyle} />
          </div>
        }
      />
    </div>
    // </Card>
  );
};

export default Branches;
