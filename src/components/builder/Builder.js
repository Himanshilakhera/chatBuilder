import "./builder.css";
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useDeferredValue,
} from "react";
import ReactFlow, {
  useNodesState,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "reactflow/dist/style.css";
import CustomeNode from "../customnode/CustomeNode";
import WelcomeNode from "../welcomenode/WelcomeNode";
import PointedEdge from "../customEdge/PointEdge";
import { useChangeLabel } from "./customHooks/useChangeLabel";
import { useChangeInputType } from "./customHooks/useChangeInputType";
import useUpdateQuestion from "./customHooks/useUpdateQuestion";
import useChoices from "./customHooks/useChoices";
import TextField from "@mui/material/TextField";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useForm, useFieldArray } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';

const options = [
  // "Talk to sales",
  // "Staff augmentation",
  // "Project Estimate",
  // "Job openings",
  // "About Us",
  // "Contact to hr",
];

let count = 0;
function Builder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useState([]);
  const [label, setLabel] = useState();
  const [text, setText] = useState("");
  const [inputType, setInputType] = useState("");
  const [question, setQuestion] = useState("");
  const [choice, setChoice] = useState([]);
  const [isVisible, setIsVisible] = useState(0);

  const labelValue = useDeferredValue(label);
  const inputValue = useDeferredValue(inputType);
  const questionValue = useDeferredValue(question);
  const [edge, setEdge] = useState();
  const [isInitial, setIsInitial] = useState(false);
  const id = useSelector((state) => state.id);
  const [settingsShow, setSettingsShow] = useState(true);
  const [branchesShow, setBranchesShow] = useState(false);
  const [LeftBarShow, setLeftBarShow] = useState(true);
  const [value, setValue] = useState(0);
  const [showChoices, setShowChoices] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [actionName, setActionName] = useState('');
  const [InputTypeName, setInputTypeName] = useState('option');
  const [AllOptions, setAllOptions] = useState([]);
  const [AllQuestions, setAllQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  

  const StyledChip = styled(Chip)`
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(195deg, #1ce4b8 0%, darkcyan 100%);
    color: white;
  }
`;

  const handleOptionClick = (option) => {
  setChoice(option)
    // const updatedSelectedOptions = new Set(selectedOptions);
    // setSelectedOptions((prevOptions) => {
    //   const updatedSelectedOptions = new Set(prevOptions);

    //   if (updatedSelectedOptions.has(option)) {
    //     updatedSelectedOptions.delete(option);
    //   } else {
    // setChoice(option)
    //   axios
    //   .post(`${process.env.REACT_APP_URL}api/v1/insertOption`, choice)
    //   .then(res =>{
    //    console.log("Response"+res);
    //  })
    //   .catch((error) => {
    //    console.error("Error", error);
    //  });
    //     updatedSelectedOptions.add(option);
    //   }

    //   return updatedSelectedOptions;
    // });


    // setNodes((prevNodes) =>
    //   prevNodes.map((node) => {
    //     if (node.id === localStorage.getItem("id")) {
    //       node.data = {
    //         ...node.data,
    //         options: Array.from(updatedSelectedOptions),
    //       };
    //     }
    //     return node;
    //   })
    // );
  };

  const handleDelete = (chipToDelete) => {
    debugger
    setSelectedOptions((prevOptions) => {
      const updatedOptions = new Set(prevOptions);
      updatedOptions.delete(chipToDelete);
      return updatedOptions;
    });
  };



  useChangeInputType(inputValue, setNodes);
  useUpdateQuestion(questions, setNodes);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === localStorage.getItem("id")) {
          node.data = {
            ...node.data,
            isVisible: true,
          };
        }

        return node;
      })
    );
  }, [isVisible, setNodes]);
  useChangeLabel(labelValue, setNodes);
  useChoices(choice, setNodes);
  const nodeTypes = useMemo(
    () => ({ custom: CustomeNode, welcome: WelcomeNode }),
    []
  );
  useEffect(() => { }, [id]);
  const edgeTypes = useMemo(() => ({ pointEdge: PointedEdge }), []);
  const rootNode = () => {
    localStorage.setItem("id", 0);
    setNodes([
      {
        id: "0",
        type: "custom",
        position: { x: 450, y: 30 },
        data: {
          createNode: createNode,
          actionName: "Welcome Node",
          question: [],
          options: [],
          isVisible: true,
          setLeftBarShow: setLeftBarShow,
        },
      },
    ]);
  };

  useEffect(() => {
    console.log(nodes);
    axios
      .post(`${process.env.REACT_APP_URL}api/v1/node`, nodes[nodes.length - 1])
      .then(res => {
        console.log("Response" + res);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [nodes.length]);

  useEffect(() => {
    const clickedNode = nodes.find(node => node.id === id);
    if (clickedNode) {

      setActionName(clickedNode.data.actionName);
      setInputTypeName(clickedNode.data.inputType);
      setAllOptions(clickedNode.data.options);

      console.log(actionName)
      console.log(InputTypeName)
      console.log(AllOptions)
      console.log(AllQuestions)

    } else {
      setActionName('');
    }
    if (clickedNode) {
      setAllQuestions(clickedNode.data.question);
    } else {
      setAllQuestions([])
    }
  }, [id, nodes]);

  const deleteNode = (nodeId) => {
    setNodes((nodes) => nodes.filter((element) => element.id !== nodeId));
    setEdges((edges) => edges.filter((element) => element.target !== nodeId));
    setEdges((edges) => edges.filter((element) => element.source !== nodeId));
  };



  const createNode = ({ nodeId, actionName }) => {
    setIsVisible(count);
    setNodes((nodes) => {
      setEdge({
        id: "" + count,
        source: nodeId,
        target: Number(nodes[nodes.length - 1].id) + 1 + "",
        type: "pointEdge",
        style: { stroke: "black", strokeWidth: 2 },
      });
      return nodes;
    });

    console.table({
      id: "" + count,
      source: nodeId + "",
      target: +"",
    });
    let size = localStorage.getItem("id") === "0" ? 300 : 300;
    console.table(edges);
    setNodes((nodes) => [
      ...nodes,
      {
        id: Number(nodes[nodes.length - 1].id) + 1 + "",
        type: "custom",
        position: {
          x: nodes[nodes.length - 1].position.x,
          y: nodes[nodes.length - 1].position.y + size,
        },
        data: {
          createNode: createNode,
          actionName: actionName,
          options: [],
          question: [],
          inputType: inputType,
          isVisible: true,
          deleteNode: deleteNode,
          setLeftBarShow: setLeftBarShow,
        },
      },
    ]);
    localStorage.setItem("id", ++count);
    const questionElement = document.getElementById("question");
    if (questionElement) {
      questionElement.value = "";
    }
    document.getElementById("label").value = "";
    console.log(edges);
  };

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handler = (e) => {
    setInputType(e.target.value);
    if (e.target.value === "text") {
      document.getElementById("text").checked = true;
      document.getElementById("option").checked = false;
      setShowChoices(false);
    } else {
      document.getElementById("option").checked = true;
      document.getElementById("text").checked = false;
      setShowChoices(true);
    }
  };

  const settings = () => {
    setBranchesShow(false);
    setSettingsShow(true);
  };
  const branches = () => {
    setBranchesShow(true);
    setSettingsShow(false);
  };

  const closeLeftbar = () => {
    setLeftBarShow(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("AllQuestions:", AllQuestions);


  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      inputFields:
        Array.isArray(AllQuestions)
          ? AllQuestions.map((question) => ({ value: question }))
          : [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputFields",
  });

  const Remove = (index) => {
    debugger
    remove(index)
    // axios
    // .delete(`${process.env.REACT_APP_URL}api/v1/removeQuestion`)
    // .then(res => {console.log(res)})
    // .catch(err => {console.log(err)})
  }

  const onSubmit = (data) => {
    console.log("Input Values:", data.inputFields);
    setQuestions(data.inputFields);
    const payload = data.inputFields.reduce((result, q, index) => {
      var question = q.value;
      console.log(question)
      var id = localStorage.getItem("id")
      result[index] = { id: id, question: question };
      return result;
    }, {});
    console.log("payload" + JSON.stringify(payload))
    axios
      .post(`${process.env.REACT_APP_URL}api/v1/insertQuestion`, payload[0])
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    reset();
  };

  useEffect(() => {
    reset({
      inputFields: AllQuestions.map((question) => question)
    });
  }, [AllQuestions, reset]);

  useEffect(() => {
    if (!isInitial) {
      if (count > 0) {
        setEdges((edges) => [...edges, edge]);
      }
      console.table(edges);
    } else {
      setIsInitial(false);
    }
  }, [edge]);
  useEffect(() => {
    console.log(edges);
  }, [edges]);
  useEffect(() => {
    if (!isCreated) {
      rootNode();
      setIsCreated(true);
    }
  }, []);
  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              type: "pointEdge",
              style: { stroke: "black", strokeWidth: 2 },
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );


  return (
    <div className="BuilderDiv">
      <div style={{ height: "100%", width: "100%" }} className="FlowScreen">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          onNodesDelete={onNodesDelete}
        >
          <Background
            variant="dots"
            gap={12}
            size={1}
            style={{ background: "rgb(206, 205, 205)" }}
          />
          <MiniMap
            nodeColor={"#dd33ff"}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
        </ReactFlow>
      </div>
      {LeftBarShow ? (
        <div className="LeftBar">
          <div className="LeftbarHeader">
            <div className="LeftBarHeading">
              {actionName ? <h2 style={{ color: "white" }}>{actionName}</h2> :
                <h2 style={{ color: "white" }}>NoData</h2>}
            </div>
            <div className="closeIcon">
              <CloseOutlinedIcon
                onClick={() => closeLeftbar()}
                style={{ fontSize: "30px", color: "white", marginLeft: "75%" }}
              />
            </div>

          </div>
          <div className="BuilderBody">
            <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                textColor="black"
              >
                <Tab label="Settings" onClick={() => settings()} />
                <Tab label="If/Then branches" onClick={() => branches()} />
              </Tabs>
            </Box>
            <div className="top"></div>
            <div className="nodeLabel">
              <h3>Action name(internal only) *</h3>
              <TextField
                id="label"
                label="Action Name"
                variant="outlined"
                value={actionName || ''}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="questions">
              <h3>Message *</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                  <div key={field.id} className="MessageField">
                    <div style={{ width: "90%" }}>
                      <TextField style={{ width: "95%", marginBottom: "10px" }}
                        {...register(`inputFields.${index}.value`)}
                        id="question"
                        label="Message"
                        variant="outlined"
                        onChange={(e) => {
                          setQuestion(e.target.value);
                        }}
                        defaultValue={field.value}
                      />
                    </div>

                    <div style={{ width: "10%" }}>
                      <button
                        className="RemoveButton"
                        type="button"
                        onClick={() => Remove(index)}
                      >
                        <DeleteIcon
                          style={{ color: "white", fontSize: "30px" }}
                        />
                      </button></div>
                  </div>
                ))}
                <button
                  className="addSubButtons"
                  type="button"
                  onClick={() => append({ value: "" })}
                >
                  Add Field
                </button>
                <button className="addSubButtons" type="submit">
                  Submit
                </button>
              </form>
            </div>

            <h3>Input Type</h3>
            <div className="inputType">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>Choices</label>
                    </td>
                    <td>
                      <input
                        type="radio"
                        checked={InputTypeName === "option"}
                        value={"option"}
                        id="option"
                        onClick={(e) => handler(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Text</label>
                    </td>
                    <td>
                      <input
                        type="radio"
                        value={"text"}
                        checked={InputTypeName === "text"}
                        id="text"
                        onClick={(e) => handler(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {showChoices === "true" || InputTypeName === "option" ? (
              <div>
                <h3 style={{ margin: "10px" }}>Your visitors' responses</h3>
                <h4 style={{ margin: "10px", marginTop: "15px" }}>
                  Quick replies :
                </h4>

                <div className="response">
                  <div className="default">
                    {options.map((op, i) => {
                      return (
                        //   <button
                        //   className={`opBtn ${selectedOptions.has(op) ? 'active' : ''}`}
                        //   key={i}
                        //   onClick={() => handleOptionClick(op)}
                        // >
                        //     {op}
                        //   </button>
                        <StyledChip
                         spacing={1}
                          className={`opBtn ${selectedOptions.has(op) ? 'active' : ''}`}
                          style={{ display: 'inline-block', width: 'fit-content' }}
                          key={i}
                          label={op}
                          onClick={() => handleOptionClick(op)}
                          onDelete={() => handleDelete(op)}
                          variant="outlined"
                        />

                      );
                    })}
                  </div>
                  <div className="customResponse">
                    <TextField
                      style={{ marginRight: "40px", width: "70%" }}
                      id="textInput"
                      label="Add your response here.."
                      variant="outlined"
                      onChange={(e) => {
                        setText(e.target.value.replace(/[,;]/g, "").trim());
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.key ==="," || e.key===";") {
                          e.preventDefault();
                          if (text.trim().length > 0) {
                          options.push(text);
                          setChoice(text);
                          document.getElementById("textInput").value = "";
                          }
                          setText("");
                        }
                      }}
                    />

                    <button
                      onClick={() => {
                        options.push(text);
                        setChoice(text);
                        document.getElementById("textInput").value = "";
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Builder;
