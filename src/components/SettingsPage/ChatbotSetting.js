import "./chatbotSetting.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { Checkbox } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import SouthWestOutlinedIcon from '@mui/icons-material/SouthWestOutlined';
import SouthEastOutlinedIcon from '@mui/icons-material/SouthEastOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Chatbot from "../chatBot/Chatbot";
import Builder from "../builder/Builder";

function ChatbotSetting() {
    const [value, setValue] = useState(0);
    const [valueChannel, setValueChannel] = useState(0);
    const [channelShow, setChannelShow] = useState(true);
    const [builderShow, setBuilderShow] = useState(false);
    const [AccessShow, setAccessShow] = useState(false);
    const [configureShow, setConfigureShow] = useState(true);
    const [shiftLeft, setShiftLeft] = useState(false);
    const [isDialog, setDialog] = useState(true);
    const [visible, setVisible] = useState(false);
    const [color,setColor] = useState('');
    const defaultColors = ['red', 'yellow', 'green', 'blue', 'purple', '#42424a'];

    const shiftWidget = (direction) => {
        if (direction === 'left') {
            setShiftLeft(true);
        } else if (direction === 'right') {
            setShiftLeft(false);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeChannel = (event, newValue) => {
        setValueChannel(newValue);
    };

    const channel = () => {
        setChannelShow(true);
        setAccessShow(false);
        setBuilderShow(false);
    };

    const flowBuilder = () => {
        setChannelShow(false);
        setAccessShow(false);
        setBuilderShow(true);
    };

    const access = () => {
        setChannelShow(false);
        setAccessShow(true);
        setBuilderShow(false);
    };

    const configure = () => {
        setConfigureShow(true);
    };

    const availability = () => {
        setConfigureShow(false);
    };

    const trackingCode = () => {
        setConfigureShow(false);
    };

    const getColor = (event) => {
        const backgroundImage = window.getComputedStyle(event.currentTarget).getPropertyValue('background-image');
        setColor(backgroundImage);
    };

    function getSecondColor(color) {
        if (color === 'red') {
            return '#ee6464';
        }
        else if (color === '#42424a') {
            return '#191919';

        } else if (color === 'yellow') {
            return '#ee6464';

        } else if (color === 'green') {
            return '#44d257';

        } else if (color === 'blue') {
            return '#68c4ec';

        } else if (color === 'purple') {
            return '#cd58cd';

        } else {
            return 'white';
        }
    }

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label="Channels" onClick={() => channel()} />
                    <Tab label="Flow builder" onClick={() => flowBuilder()} />
                    <Tab label="Access" onClick={() => access()} />
                </Tabs>
            </Box>

            <div>
                {channelShow ? <div className="channelOption">
                    <div className="channel">
                        {/* <div className={`innerContainer ${shiftLeft ? 'shift-right' : ''}`}> */}
                        <div className="innerContainer">

                            <div>
                                <h1>Chat</h1>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={valueChannel} onChange={handleChangeChannel}>
                                        <Tab label="Configure" onClick={() => configure()} />
                                        <Tab label="Availability" onClick={() => availability()} />
                                        <Tab label="Tracking Code" onClick={() => trackingCode()} />
                                    </Tabs>
                                </Box>
                            </div>

                            {configureShow ? <div className="configure">
                                <h2>Display</h2>
                                <div className="colors">
                                    <h4><b>Color</b></h4>
                                    <p>Choose an accent color</p>
                                    <div className="color">
                                        <div className="default-colors">
                                            <div>
                                                {defaultColors.map((color, index) => (
                                                    <div id="color"
                                                        className="color"
                                                        key={index}
                                                        style={{
                                                            backgroundImage: `linear-gradient(195deg, ${color} 0%, ${getSecondColor(color)} 100%)`
                                                        }}
                                                        onClick={getColor}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget">
                                    <h4><b>Chat widget placement</b></h4>
                                    <p>Decide what side of your website you would like your chat widget to appear on.</p>
                                    <div className="Widgetside">
                                        <button className={`side ${shiftLeft ? 'shift-left' : ''}`} onClick={() => shiftWidget('left')}>
                                            <div className="sideIcon"><SouthWestOutlinedIcon style={{ fontSize: '15px' }}/></div>
                                            <p className="sideP">BottomLeft</p>
                                        </button>
                                        <button className={`side ${!shiftLeft ? 'shift-right' : ''}`} onClick={() => shiftWidget('right')}>
                                            <div className="sideIcon"><SouthEastOutlinedIcon style={{ fontSize: '15px' }}/></div>
                                            <p className="sideP">BottomRight</p>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h4><b><Checkbox />Remove flick ERP branding</b></h4>
                                    <p>Remove flick ERP branding on you messages chat window.</p>
                                </div>

                                <div>
                                    <h4><b>Send from:</b></h4>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Send from:</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Send form:"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'abc@gmail.com'}>abc@gmail.com</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div> : null}
                        </div>
                    </div>

                    <div className="chat">
                    {/* <div className="chat-Bot"> */}
                    <div className={`chat-Bot ${shiftLeft ? 'shift-left' : 'shift-right'}`}>
                    {visible ? <Chatbot color={color}/>: null}
                    <div className="chatButton">
                    {/* <div className="chatButton"> */}
                     {isDialog ? <button style={{backgroundImage:color}} className="chatbotButton" onClick={() =>{
                         setVisible(true)
                         setDialog(false)}}><QuestionAnswerOutlinedIcon style={{fontSize:'25px' ,color:"white"}}/></button> : null}
                     {!isDialog ? <button style={{backgroundImage:color}}className="chatbotButton" onClick={() => {
                        setVisible(false)
                        setDialog(true)
                        }}><CloseOutlinedIcon style={{fontSize:'25px' ,color:"white"}}/></button> : null}
                    </div>
                    </div>
                    </div>

                </div> : null}

                {builderShow ? <div className="builderOption"> 
                <Builder/>
                </div> : null}

                {AccessShow ? <div className="AccessOption">
                    <div class="innerContainer">
                        <h1>Access</h1>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Manage who has access to this inbox.</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="first"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="first" control={<Radio />} label="Available to everyone" />
                                <FormControlLabel value="second" control={<Radio />} label="Select users and teams who can edit" />
                            </RadioGroup>
                        </FormControl>

                    </div>
                </div> : null}
            </div>

        </div>
    );
}

export default ChatbotSetting;