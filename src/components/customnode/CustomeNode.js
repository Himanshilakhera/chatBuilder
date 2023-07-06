import React from "react";
import { Handle, Position } from "reactflow";
import "./customeNode.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import { setId } from "../redux/idSlice";
const CustomeNode = ({ data, id }) => {
  const dispatch = useDispatch();

  const clickHander = (e) => {

    dispatch(setId(id));
    // onNodeClik(id);
    localStorage.setItem("id", id);
    console.log(id);
    data.setLeftBarShow(true);
  };

  return (
    <div className="node" onClick={(e) => clickHander(e)}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ background: "#555" }}
        //onConnect={handleConnect}
      />
      <div className="inner">
        <header className="nodeHeader">
          {data.actionName ? (
            <label>{data.actionName}</label>
          ) : (
            <label>No data</label>
          )}
          <CloseOutlinedIcon 
            id="closeIcon"
            onClick={() => {
              if(id==='0'){
                alert("Root can not be deleted")
              }else{
              data.deleteNode(id)}}}
            style={{ float: "right" }}
          />
        </header>

        <div className="bodyNode">
          {data.question.length > 0
            ? data.question.map((q, i) => {
                return (
                  <div className="qDiv" key={i}>
                    <p>{q.value}</p>
                  </div>
                );
              })
            : null}

          {data.options.length > 0 ? (
            <div className="options">
              {data.options.map((op, i) => {
                return i % 2 === 0 ? (
                  <button
                    key={i}
                    onClick={() => {
                      data.createNode({ nodeId: id, actionName: op });
                    }}
                  >
                    {op}
                  </button>
                ) : (
                  ""
                );
              })}
            </div>
          ) : (
            <></>
          )}

          {data.inputType ? (
            <div className="typeDiv">
              <label>{data.inputType}</label>
            </div>
          ) : null}
        </div>

        <footer className="responseType">
          <div className="addNew">
            {data.isVisible ? (
              <button
                onClick={() => {
                  data.createNode({ nodeId: id });
                }}
              >
                <i
                  className="fa fa-plus-circle"
                  aria-hidden="true"
                  style={{ color: "rgb(91, 90, 90)" }}
                ></i>
              </button>
            ) : (
              ""
            )}
          </div>
          {/* <div className="optDiv"></div> */}
        </footer>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default CustomeNode;
