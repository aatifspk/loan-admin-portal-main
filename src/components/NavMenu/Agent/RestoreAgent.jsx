import React, { useEffect, useState, useTransition } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useDarkMode from "@/hooks/useDarkMode";
import { getSoftDeleteAgentList } from "@/redux/slices/Agent/GetSoftDeleteAgentList";
import Card from "@/components/ui/Card";
import { restoreAgent } from "@/redux/slices/Agent/RestoreAgent";
import { PermanentDeleteAgent } from "@/redux/slices/Agent/permanentDeleteAgent";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import noDataImage from "@/assets/images/all-img/no-data.png";
import { useLocation } from "react-router-dom";
//here we do
const RestoreAgent = () => {
  // const { branchList } = useSelector((state) => state.branchSlice);
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
  const noDataStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    color: isDark
      ? "rgb(203 213 225 / var(--tw-text-opacity))"
      : "rgb(15 23 42 / var(--tw-text-opacity))",
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
  //   useEffect(() => {
  //     dispatch(getSoftDeleteAgentList());
  //   }, []);
  const { deletedAgentList } = useSelector(
    (state) => state.GetSoftDeleteAgentList
  );
  // ----creating data --------
  useEffect(() => {
    dispatch(getSoftDeleteAgentList());
  }, [dispatch]);

  const data = deletedAgentList?.data?.listAgents?.map((item) => ({
    ...item,
    firstName: item.firstName,
    lastName: item.lastName,
    city: item.city,
    branchId: item.branchId,
    email: item.email,
    phone: item.phone,
    deletedAt: item.deletedAt,
    id: item._id || {},
  }));
  const location = useLocation();
  const handleView = (row) => {
    const id = row._id;
    const pathName = location.pathname;
    navigate("/layout/view-agents", { state: { id, pathName } });
  };
  const handleRestore = (row) => {
    const id = row._id;
    dispatch(restoreAgent(id))
      .then((res) => {
        dispatch(getSoftDeleteAgentList());
        toast.success(res.payload.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePermanentDelete = (row) => {
    const id = row._id;
    Swal.fire({
      title: `Are you Sure Want to Permanent Delete ${
        row.firstName + " " + row.lastName
      } Agent`,
      icon: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      // if (result.isConfirmed) {
      dispatch(PermanentDeleteAgent(id))
        .then((res) => {
          dispatch(getSoftDeleteAgentList());
          toast.success(res.payload.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    });
  };

  // ------creating column ----------
  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "City",
      selector: (row) => row.city,
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
            {/* Active or Inactive */}
          </div>
        );
      },
    },
  ];

  const [records, setRecords] = useState("");
  useEffect(() => {
    setRecords(
      deletedAgentList?.data?.listAgents?.map((item) => ({
        ...item,
        branchName: item.branchName,
        branchCode: item.branchCode,
        city: item.city,
        branchVisibleName: item.branchVisibleName,
        deletedAt: item.deletedAt,
        id: item._id || {},
      }))
    );
  }, [setRecords, deletedAgentList]);
  // -----Adding a Search Box ---------

  const subHeaderComponent = (
    <div className="w-full grid xl:grid-cols-2 md:grid-cols-1 md:text-start gap-3  items-center">
      <div className="table-heading text-start ">Deleted Agents</div>
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
    <Card>
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
    </Card>
  );
};

export default RestoreAgent;
