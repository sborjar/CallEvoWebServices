# CWS - CallEvo Web Services Library

- **Library link:** https://assets.callevo.net/core/cws.latest.js
- **Last Review:** December, 2024
- **Last Version:** CWS 2.0 Alpha
- **Developed In:** JavaScript
- *Include NATS*

*CallEvo Web Services (CWS)* is a web interface framework that allows easy and intuitive creation and implementation of an agent that consumes CallEvo® services (**CallEvo Api™**, **CallEvo Communications™** and **CallEvo Pepper™**).

The main objective of CWS is to allow the customer to create an independent communication application, with the design and structure that fits the line of business, linked to all our services available for this task.

## Content

- Instance
- Registration & Initialization
    - settingsInit
    - settingDialBack
    - addEventListener
    - conn
- Parameters
    - keepalive
    - debug
    - numberLines
    - actual_line
- Constants
- Api Methods
    - getAuth
    - getCampaignsTenant
    - login
    - getManualCampaigns
    - getTransferAgentsData
    - getTransferCampaignData
- Session Storage examples
- General Methods
    - activeCalls
    - onSend
        - OUTCALL
        - SETSTATUS
        - CALLBACK
    - selectRow
    - funcTransfer
    - funcHold
    - funcDTMF
    - funcBridge
    - funcConference
    - funcDisconnect
    - funcBreakConference
    - funcReCall
    - funcHangUp
    - onClose
    - sendPreviewCallResults
- Listener (Events)
    - ACTIONBUTTONS
    - AGENTLOGIN
    - AGENTLOGOFF
    - AGENTLOGINTIMEOUT
    - CANCHANGEAGENTSTATUS
    - CALLBACK
    - CALLDATA
    - IDCONNECTION
    - KICKAGENT
    - LOG
    - LOGOFF
    - PREVIEWCALL
    - PHONEMSG
    - SELECTROW
    - STARTRECORDING
    - STOPRECORDING
    - SETSTATUS
    - WEBRTCMSG
    - WEBSOCKET
- Getting Started
    - index.html
    - agent.html

**Note**: The sample code is made with HTML, CSS, jQuery, JavaScript. The purpose is to give you a guide of the code that you can implement.

<br><br><br>
# Instance
To create the instance with the CWS library you must generate a code as follows:

```js
let cws = new CallEvoWebServices(); 
```
<br><br><br>
# Registration & Initialization
## **settingsInit**
Records the information obtained from the agent user, such as: id, name, agent code, among others (See getAuth () Method).
```js
let audit_settingsInit = cws.settingsInit(globalData);
```
Returns true or false
<br><br>

## **settingDialBack**
Register DialBack phone number.
```js
let audit_settingDialBack = cws.settingDialBack(dialback);
```
The structure of the Dial Back is: (dialback: 1 – active, 0 – inactive)
```js
let dialback = {
    dialback: 1,
    number: "7201234567"
}
```
## **addEventListener**
Register the listener mode function that the agent (client) will use to receive all the communication from the CWS library.

The way to register is as follows:
```js
cws.addEventListener(myListener);
```
## **conn**
It is used to start the communication processes; it is used once the login and campaign registration process has been completed. It is used in the main screen that the agent will operate.
```js
cws.conn();
```
The most important thing in this step is to verify that all of the above registration methods have TRUE as the resulting value (settingsInit, settingDialBack).

<br><br><br>
# Parameters
## **keepalive**
Keeps communication alive.

*true* or *false*. Default value is **false**

```js
cws.keepalive = true;
```

## **debug**
Show the messages to web console.

*true* or *false*. Default value is **false**
```js
cws.debug = true;
```

## **numberLines**
This is the number of lines you wish to activate. These lines allow the agent to interact in a call.

The default value is 2. If you want the lines to be increased automatically, the value will be 0 (zero).

Note that for each line a row must be added to the call data (see CALLDATA of the Listener).
```js
cws.numberLines = 2;
```

## **actual_line**
Returns the current line number
```js
let currentline = cws.actual_line;
```



<br><br><br>
# Constants

Constants are defined to unify responses, requests and validations, and to standardize them. They are necessary to express a comparison or a condition.

The form of use is, for example, cws.ON, replacing case "ON":
```js
switch (e.result){
    case cws.ON:
        break;
}
```
Are as follows:

> ACTIVATE, ACTIONBUTTONS, ACTUALLINE, AGENT, AGENTCAMPAIGN, AGENTCONNECT, AGENTDUMP, AGENTLOGIN, AGENTLOGINTIMEOUT, AGENTLOGOFF, AGICONNECT, BATHROOM, BREAK, BREAKCONFERENCE, BRIDGE, ACTIONBUTTONS, CALLBACK, CALLDATA, CALLERHANGUP, CALLINFO, CAMPAIGN, CANCEL, CANCHANGEAGENTSTATUS, CHAT2AGENT, CLOSE, CLEAR, COMPLETEAGENT, COMPLETECALLER, CONF, CONFERENCE, CONFIRM, CONN, CONNECT, COUNTCALLBACK, DIALBACK, DISABLED, DISCONNECT, DOUBLECALL, ENTERCONF, ERROR, EXITCONF, FAIL, FAILDNC, FAILNOCAMP, FAILTZ, GOTOLINE, HANGUP, HOLD, IDCONNECTION, INFO, INFOCALL, KICKAGENT, LINES, LOG, LOGOFF, LUNCH, MANUALCALL, MEETING, NEW, NOKEY, NOTREADY, OFF, OK, ON, OTHER, OUTCALL, PHONE, PHONEMSG, PING, PONG, PREVIEWCALL, READY, RECALL, REGISTEROBJECTS, RETRIEVE, SCRIPTURL, SELECTROW, SENDDTMF, SETDISPHANG, SETDISPHANGALL, SETSTATUS, SKIP, STARTRECORDING, STOPRECORDING, SUCCESS, TALKING, TRANSFER, VISIBLE, WEBRTCMSG, WEBSOCKET, WRAP


**Important:** All constants are expressed in capital letters.


<br><br><br>
# **Api Methods**
## **getAuth**
Requests agent authentication via email and password. This method returns all the information of the registered user in JSON format.

This JSON contains all the information of the tenants registered with that email.

This information is used to present the agent with the option to select which tenant he/she wishes to work with.

Parameters to send:
```js
let params = {
    email = "register@domain.com",
    pass = "MyP4sSw0rD"
}
```
Format:
```js
await cws.getAuth(params)
    .then(resp=>{/* CODE*/})
    .catch(resp=>{/* CODE*/})
```
Response:
```json
{
    "status": "ok",
    "message":[
        {
            "userid": 18852,
            "username": "wkdolsjjd88djiksD",
            "fullname": "Agent Test",
            "email": "register@domain.com",
            "tenant":{
                "tenantid": 25,
                "name": "Default Tenant Test"
            },
            ....
        }
    ]
}
```
You can create a dropdown object containing the **userid** and **tenant name** for the agent to select, as follows:
```js
let html = "";
lstTenants.forEach(e => {
    html = `${html}<option value="${e.userid}">${e.tenant.name} </option>`
});
$("#slTenants").html(html);
```
Once we have selected the user and the tenant with which we want to enter the agent, we must use a **method settingsInit**

```js
lstTenants.forEach(e => {
    if (e.userid == userID) {
        cws.settingsInit(e);
    }
});
```
## **getCampaignsTenant**
Gets a list of campaigns that the agent has in the selected tenant to be able to register.

Format:
```js
await cws.getCampaignsTenant()
    .then(resp=>{/* CODE*/})
    .catch(resp=>{/* CODE*/})
```

Response:
```json
[
    {
        "campid":"31",
        "camp_name": "camptest1",
        "team": "teamone",
        "isselected": "false"
    },
    {
        "campid":"32",
        "camp_name": "camptest2",
        "team": "teamtwo",
        "isselected": "false"
    },
]
```
From the list obtained we must present to the agent which campaigns to register (one or several).

The list of campaigns must be collected by the field camp_id and separated by commas, to be sent in the login registration method. 

`Ex: "31,223,30,11,10,3"`

## **login**
Registers the tenant's user in the selected campaigns to work with.

Format:
```js
let globalCamps = "31,223,30,11,10,3";
await cws.login(globalCamps)
    .then(resp=>{/* CODE*/})
    .catch(resp=>{/* CODE*/})
```

Response:
```json
{
    "status": "OK",
    "action": "ADDLOGIN",
    "answer": "OK"
}
```

## **getManualCampaigns**
Returns a list of manual campaigns in which you are registered.

Format:
```js

await cws.getManualCampaigns()
    .then(resp=>{/* CODE*/})
    .catch(resp=>{/* CODE*/})
```

Response:
```json
[
    {
        "camp_id": "31",
        "camp_name": "camptest1 manual"
    },
    {
        "camp_id": "32",
        "camp_name": "camptest2 manual"
    },
]
```


## **getTransferAgentsData**
Returns a list of agents for call transfer.

Format:
```js

await cws.getTransferAgentsData()
    .then(resp=>{/* CODE*/})
    .catch(resp=>{/* CODE*/})
```

Response:
```json
[
    {
        "data": "as4jkdjFuu4j1D",
        "label": "Agent 2"
    },
    {
        "data": "u213288swjjsd",
        "label": "Agent 3"
    },
]
```

## **getTransferCampaignData**
Returns a list of campaigns to transfer the call so that a free agent can answer.

Format:
```js

await cws.getTransferCampaignData()
    .then(resp=>{/* CODE*/})
    .catch(resp=>{/* CODE*/})
```

Response:
```json
[
    {
        "camp_id": "341",
        "camp_name": "inbound_campaign"
    },
    {
        "camp_id": "342",
        "camp_name": "outbound_campaign"
    },
    {
        "camp_id": "343",
        "camp_name": "manual_campaign"
    },
]
```
<br><br><br>
# **Session Storage Examples**
**Important:** All data obtained as a result of the methods must be stored in local session variables or cookies, encrypted or not.

Example:

List of tenants
```js
sessionStorage.setItem("list-tenants", JSON.stringify(lstTenants));
```
User selected
```js
sessionStorage.setItem("user-data", JSON.stringify(e));
```
Dial back configuration
```js
sessionStorage.setItem("settingsDialBack", JSON.stringify({
    dialback: dialback_status,
    number: dialback_status == 1 ? $("#phone").val() : ''
}));
```

<br><br><br>
# **General Methods**

## **activeCalls**
The number of currently active lines is obtained, i.e. lines that are in HOLD or TALKING mode.
```js
let num_calls_active = cws.activeCalls()
```

## **onSend**
It is a method that allows sending requests to the communications service. It is structured in two parts action and parameters:
Format:
```js
cws.onSend(action, params);
```

#### OUTCALL
To make a manual call
Fields: camp_id, phone, type => “phone”, leadId: 0 (default)
```js
let params = {
    camp_id: parseInt($("#cmbCamp option:selected").val()),
    phone: $("#phonemanualcall").val(),
    type: "phone",
    leadId: 0,
};
cws.onSend(cws.OUTCALL, params);
```
#### SETSTATUS
When the agent status dropdown (client side) is changed, the status must be sent to CWS for registration.
```js
let params = {
    status: cws.NOTREADY
};
cws.onSend(cws.SETSTATUS, params);
```

#### CALLBACK
The status list of the agents will be loaded automatically when the object is registered and will depend on the status of the call.

When selecting the phone number to be called, the ID to which the number belongs must be sent to the onSend method.

```js
let params = {
    id: e.id
};
cws.onSend(cws.CALLBACK,, params);
```

## **selectRow**
This method allows to communicate between the client side (HTML) and the CWS service, indicating that the user clicked on a line to visualize its information.

The agent must have a table in HTML with two or more rows and each of them will be a line.

Parameter is the whole row in an array

[1,'','',''] or [2,'','',''] or [3,'','','']

If it is activated or not depending on the agent state, if it is in TALKING it cannot be changed in line with the exception of HOLD or NOTREADY.

```js
var table = $('#tblCallData tbody').on("click", "tr", function () {
    let data = $(this)[0].outerText.split("\t");
    cws.selectRow(data);
});
```
Make sure that the **numberLines** parameter is defined with the lines you are setting here.

## **funcTransfer**
This method sends a transfer request.

There are 3 types of transfer:

- To an agent
- To a campaign
- To a phone number

```js
cws.funcTransfer(cws.AGENT, data);
cws.funcTransfer(cws.CAMPAIGN, data);
cws.funcTransfer(cws.PHONE, data);
```

**AGENT**

The data is obtained by calling the api method getTransferAgentsData(), and the field is data.

**CAMPAIGN**

The data is obtained by calling the api method getTransferCampaignData(), and the field is camp_id.

**PHONE**

The data is the content of an input box entered by the agent

## **funcHold**
Sends a request to put the current line on HOLD or RETREIVE

```js
cws.funcHold();
```

## **funcDTMF**
Sends DTMF digits to a call.
```js
let data = "*4";
cws.funcDTMF(data);
```

## **funcBridge**
Activate the bridge mode between 2 active calls, you need to send as parameters the two active lines. 

Example :[1,2]
```js
if (cws.activeCalls() == 2) { 
    let lines = []; 
    $(".checks").prop('checked', function () { 
        let id = $(this).attr('value'); 
        lines.push(id); 
    }); 
    cws.funcBridge(lines); 
}
```

## **funcConference**
Establishes a conference between one or two active lines. To perform this action, the call must be in HOLD or TALKING state.

```js
cws.funcConference([1]);
cws.funcConference([1,2]);
```

## **funcDisconnect**
Disconnects active conference calls.
```js
cws.funcDisconnect();
```

## **funcBreakConference**
Disconnects active calls that are in conference by returning to the initial HOLD and TALKING state.
```js
cws.funcBreakConference();
```

## **funcReCall**
Call back to conference.
```js
cws.funcReCall();
```
## **funcHangUp**
Send a hang up on the call.
```js
cws.funcHangUp();
```

## **onClose**
Close all communications with CWS services.
```js
cws.onClose();
```

## **sendPreviewCallResults**
Sends the data selected by the agent when PREVIEW CALL was presented.
```js
cws.sendPreviewCallResults(cws.CONFIRM);
cws.sendPreviewCallResults(cws.CANCEL);
cws.sendPreviewCallResults(cws.SKIP);
```

<br><br><br>
# **Listener**
This listener receives all communication from the CWS library.

It will receive several events that present information about the operations performed: the current call, error data, actions to be performed.

How to register
```js
cws.addEventListener(myListener);
```

Structure
```js
function myListener(e){
    if (!e){
        return;
    }

    if (cws.debug) console.log(e);

    switch (e.event) {
        case cws.ACTIONBUTTONS:
            break;
        case cws.AGENTLOGOFF:
            break;
        case cws.AGENTLOGIN:
            break;
        case cws.AGENTLOGINTIMEOUT:
            break;
        case cws.CANCHANGEAGENTSTATUS:
            break;
        case cws.CALLBACK: 
            break;
        case cws.CALLDATA:
            break;
        case cws.IDCONNECTION:
            break;
        case cws.KICKAGENT:
            break;
        case cws.LOG:
            break;
        case cws.LOGOFF:
            break;
        case cws.PREVIEWCALL:
            break;
        case cws.PHONEMSG:
            break;
        case cws.SELECTROW:
            break;
        case cws.STARTRECORDING:
            break;
        case cws.STOPRECORDING:
            break;
        case cws.SETSTATUS:
            break;
        case cws.WEBRTCMSG:
            break;
        case cws.WEBSOCKET:
            break;
}
```
## **Events**

#### **ACTIONBUTTONS**
The CWS library helps us to identify which buttons, (if included in the design), should be disabled or visible, by sending a list that includes the name of the reference and the value to apply (true/false).

The buttons are:

MANUALCALL, HOLD, RETRIEVE, TRANSFER, SENDDTMF, BRIDGE, CONF, DISCONNECT, BREAKCONFERENCE, RECALL, HANGUP.

```json
{
    "event": "ACTIONBUTTONS",
    "action": "DISABLED/VISIBLE",
    "buttons": [
        {"name": "MANUALCALL", "value": true},
        {"name": "HOLD", "value": true},
        {"name": "RETRIEVE", "value": true},
        {"name": "TRANSFER", "value": true},
        {"name": "SENDDTMF", "value": true},
        {"name": "BRIDGE", "value": true},
        {"name": "CONF", "value": true},
        {"name": "DISCONNECT", "value": true},
        {"name": "BREAKCONFERENCE", "value": true},
        {"name": "RECALL", "value": true},
        {"name": "HANGUP", "value": true}
    ]
}
```
HTML code example:
```html
<button id="btmLOGOFF">Log Off</button> 
<button id="btmMANUALCALL">Manual Call</button>
<button id="btmHOLD">Hold</button>
<button id="btmRETRIEVE">Retrieve</button>
<button id="btmTRANSFER">Transfer</button>
<button id="btmSENDDTMF">Send DTMF</button>
<button id="btmBRIDGE">Bridge</button>
<button id="btmCONF">Conference</button>
<button id="btmDISCONNECT">Disconnect</button>
<button id="btmBREAKCONFERENCE">Break Conf</button>
<button id="btmRECALL">Recall</button>
<button id="btmHANGUP">Hang up</button>
```


#### **AGENTLOGIN**
Informs the time when the agent is connected and login.
```json
{"event": "AGENTLOGIN", "result": "OK"}
```

#### **AGENTLOGOFF**
Informs when the agent is disconnected and must exit to the main login screen.
```json
{"event": "AGENTLOGOFF"}
```

#### **AGENTLOGINTIMEOUT**
When it starts the connection with the communication services, a registration is produced that must be completed within 30 seconds, if not, it sends a time-out message and it is requested to exit to the main screen executing the logoff process.
```json
{"event": "AGENTLOGINTIMEOUT", "message": ""}
```

#### **CANCHANGEAGENTSTATUS**
Within the disabled attribute (true/false) the CWS library indicates whether or not to allow the agent to change its state whether it is in or out of a call. The interaction of the agent with the drop down or object that has the following states: READY, NOTREADY, TALKING, BREAK, etc.
```json
{"event": "CANCHANGEAGENTSTATUS", "disabled": true}
```
Code example:
```js
case cws.CANCHANGEAGENTSTATUS: 
    $("#status_agent").attr("disabled", event.disabled) 
    break;
```

#### **CALLBACK:**
Receives the list of pending calls from the agent to call back. When the agent's status is NOTREADY, a list of phone numbers will be sent to the CALLBACK event for the agent to select which one to call. You must be able to decline the list and it will appear again when in NOTREADY status.

```json
{
    "event": "AGENTLOGINTIMEOUT", 
    "result": [
        {
            "id": 1, 
            "phone": "7201234567", 
            "campaign": "Test", 
            "date": "2022-10-07T16:25:46.000000Z"
        },
        {
            "id": 2, 
            "phone": "7201234568", 
            "campaign": "Test", 
            "date": "2022-10-08T16:25:46.000000Z"
        }, …
]}
```
When selecting the phone number to be called, the ID to which the number belongs must be sent to the onSend method.
```js
cws.onSend(cws.CALLBACK, { id: e.id });
```

#### **CALLDATA**
This action is essential for the agent to be updated on the phone, time, and status of each call. It constantly receives information about the status of the number of lines defined in the numberLines parameter.
```json
{
    "event": "CALLDATA",
    "result": [
        {
            "id": 1,
            "phone": "",
            "time": "",
            "callstatus": "",
            "operation": "NEW"
        },
        {
            "id": 2,
            "phone": "",
            "time": "",
            "callstatus": "",
            "operation": "NEW"
        },… 
],
```
In the operation field we have 3 values: **NEW**, **CLEAR**, **''** (blank space). 

**NEW** means that you need to add a new row in the calldata table. **CLEAR** means that you need to delete all rows and build again all rows, and the **blank means** that you need to update only the values.

```js
case cws.CALLDATA: 
    if (e.result && e.result.length > 0) { 
        if (e.operation == cws.NEW) { 
            let idxnew = e.result[e.result.length - 1].id; let 
            htmlnew = ` 
                <tr id="line${idxnew}"> 
                    <td class="text-center"><b>${idxnew}</b></td>
                    <td id="line${idxnew}_phone"></td>
                    <td id="line${idxnew}_time"></td>
                    <td id="line${idxnew}_status"></td>
                    <td id="line${idxnew}_recording" class="hide">
                        <i class="fas fa-microphone-alt mr-2 text-danger"></i></td>
                    <td id="line${idxnew}_uniqueid" class="hide"></td>
                    <td id="line${idxnew}_url" class="hide"></td>
                </tr>`; 
            $("#tblBody").append(htmlnew); 
        } else if (e.operation == cws.CLEAR) { 
            let html = ""; 
            let i = 0; 
            e.result.forEach((e, idx) => { 
                i = idx + 1; 
                html = `${html} 
                    <tr id="line${i}">
                        <td class="text-center"><b>${i}</b></td>
                        <td id="line${i}_phone"></td>
                        <td id="line${i}_time"></td>
                        <td id="line${i}_status"></td>
                        <td id="line${i}_recording" class="hide">
                            <i class="fas fa-microphone-alt mr-2 text-danger"></i> 
                        </td>
                        <td id="line${i}_uniqueid" class=" hide"></td>
                        <td id="line${i}_url" class="hide"></td>
                    </tr>`; 
                $(`#script${i}`).addClass("hide"); 
            });
            $("#tblBody").html(html); 
        } 
        e.result.forEach(ele => {   
            $(`#line${ele.id}_phone`).html(ele.phone); 
            $(`#line${ele.id}_time`).html(ele.time); 
            $(`#line${ele.id}_status`).html(ele.callstatus); 
            $(`#line${ele.id}_uniqueid`).html(ele.uniqueid); 
            $(`#line${ele.id}_url`).html(ele.url); 
            if (ele.phone == "") { 
                $(`#script${ele.id}`).addClass("hide"); 
                $(`#script${ele.id}`).attr("src", ""); 
            } else { 
                if (ele.id == cws.actual_line) { 
                    $(`#script${ele.id}`).removeClass("hide"); 
                } else { 
                    $(`#script${ele.id}`).addClass("hide"); 
                } 
            } 
        }); 
    } 
    break;
```

#### **IDCONNECTION**
Receives the current connection ID.
```json
{"event": "IDCONNECTION", "connectionid": "csaDw7cnAo0454s"}

```
#### **KICKAGENT**
When the administrator user needs to log out of the system, it sends a kick to the agent, and the agent needs to log out.
```json
{"event": "KICKAGENT", "message": "You have been kick"}
```

#### **LOG**
Receives feedback on actions performed that may or may not be displayed on the screen. **INFO** / **WARN** / **ERROR** / **»** (send message) / **«** (receive message).

```json
{"event": "LOG", "result": "INFO", "message": "Test"}
```

#### **LOGOFF**
Indicates that the agent should enter a logoff process, and should return to the initial login screen.
```json
{"event": "LOGOFF", "message": ""}
```

#### **PREVIEWCALL**
Preview call is an event that occurs in **PREVIEW** type campaigns and it sends a call to the agent one without clicker, the only condition is that it is in **READY** state.

The application must present the agent with a screen that indicates if he/she wants to take, skip or cancel the call.
```json
{"event":"", "camp_id": 0, "phone":"", "leadid":0, "option":""}
```
Code example:
```js
case cws.PREVIEWCALL: 
    previewcall = e; 
    let phone = e.phone; 
    html = ` 
        <div class="text-center"> 
            <h4>Preview Call</h4>
            <h1>${phone}</h1>
            <button id="btmPreviewCall" class="btn btn-success m-1">Call</button>
            <button id="btmPreviewCancel" class="btn btn-danger m-1">Cancel</button>
            <button id="btmPreviewSkip" class="btn btn-warning m-1">Skip</button>
        </div> `; 
    $("#question").html(html); 
    $("#question").removeClass("hide"); 
    
    $("#btmPreviewCall").on("click", function () { 
        $("#question").addClass("hide"); 
        previewcall.option = cws.CONFIRM; 
        cws.sendPreviewCallResults(previewcall); 
    });
    $("#btmPreviewCancel").on("click", function () { 
        $("#question").addClass("hide"); 
        previewcall.option = cws.CANCEL; 
        cws.sendPreviewCallResults(previewcall); 
    });
    $("#btmPreviewSkip").on("click", function () { 
        $("#question").addClass("hide");
        previewcall.option = cws.SKIP; 
        cws.sendPreviewCallResults(previewcall); 
    }); 
    break;
```
#### **PHONEMSG**
The moment you connect to the messaging service COMMUNICATION LINE you will receive ON / OFF / ERROR as a response.
```json
{"event": "PHONEMSG", "result": ""}
```
Code example:
```js
case cws.PHONEMSG: 
    $("#phone_ligth").html(e.result == cws.ON ? cws.ON : cws.OFF); 
    $("#phone_ligth").removeClass("text-danger"); 
    switch (e.result) { 
        case cws.ON: 
            $("#phone_ligth").addClass("text-success");
            break; 
        case cws.OFF: 
            $("#phone_ligth").addClass("text-danger"); 
            break; 
        case cws.ERROR: 
            $("#phone_ligth").addClass("text-danger"); 
            log(e.type, e.message); 
            break; 
    } 
    break;
```

#### **SELECTROW**
Indicates which line is being used for visual highlighting in the application. You will receive an integer greater than zero, it is recommended to display the corresponding script.
```json
{"event": "SELECTROW", "row": 1}
```
Code Example:
```js
case cws.SELECTROW: 
    $("#tblCallData .tr-selected").toggleClass("tr-selected");
    $("#line" + e.row).addClass("tr-selected");
    $("#actualline").html(e.row); 
    
    /** HIDE ALL SCRIPTS */ 
    for (let i = 0; i < cws.numberLines; i++) { 
        $(`#script${i}`).addClass("hide"); 
    } 
    
    /** VERIFY IF THE SCRIPT IF LOADED*/ 
    let verify_url = $(`#script${e.row}`).attr("src"); 
    if (verify_url == undefined || verify_url == '') { 
        if (e.url != "") { 
            $(`#script${e.row}`).attr("src", e.url); 
        } 
    } 
    
    /** SHOW THE CURRENT SCRIPT */ 
    $(`#script${e.row}`).removeClass("hide"); 
    break;
```

#### **STARTRECORDING**
Indicates that recording has started in the line ID=n (ex: 1).
```json
{"event": "STARTRECORDING", "result": "OK", "id": 1}
```
Code example:
```js
$(`#recording_header`).removeClass("hide");
$(`#line${e.id}_recording`).removeClass("hide");
```

#### **STOPRECORDING**
Indicates that the recording has been stopped in the line ID=n.
```json
{"event": "STARTRECORDING", "result": "OK", "id": 1}
```
Code example:
```js
$(`#recording_header`).addClass("hide");
$(`#line${e.id}_recording`).addClass("hide");
```


#### **SETSTATUS**
Sends the agent status to be displayed, and the list of statuses that can be displayed in a drop down.

```json
{
    "event": "SETSTATUS",
    "status": "NOTREADY",
    "list_status": [
        "READY",
        "NOTREADY",
        "BREAK",
        "BATHROOM",
        "MEETING",
        "LUNCH",
        "OTHER"
    ]
}
```
Code example:
```js
case cws.SETSTATUS: 
    let html = ""; 
    e.list_status.forEach(st => { 
        html = `${html}
            <option value='${st}' ${st==e.status ?'selected':''}>${st}</option>`; 
    }); 
    $("#status_agent").html(html); 
    break;
```

#### **WEBRTCMSG**
The moment you connect to the WEB RTC messaging service you will receive **ON** / **OFF** / **ERROR** as a response.
```json
{"event": "WEBRTCMSG", "result": ""}
```
Code example:
```js
case cws.WEBRTCMSG: 
    $("#webrtc_ligth").html(e.result == cws.ON ? cws.ON : cws.OFF); 
    $("#webrtc_ligth").removeClass("text-danger"); 
    switch (e.result) { 
        case cws.ON: 
            $("#webrtc_ligth").addClass("text-success"); 
            break; 
        case cws.OFF: 
            $("#webrtc_ligth").addClass("text-danger"); 
            break; 
        case cws.ERROR: 
            $("#webrtc_ligth").addClass("text-danger"); 
            break; 
    } 
    break;
```

#### **WEBSOCKET**
The moment you connect to the WEBSOCKET messaging service you will receive **ON** / **OFF** / **CLOSE** / **ERROR**.

```json
{"event": "WEBSOCKET", "result": ""}
```
Code example:
```js
case cws.WEBSOCKET: 
    $("#pepper_ligth").html(e.result == cws.ON ? cws.ON : cws.OFF); 
    $("#pepper_ligth").removeClass("text-danger"); 
    switch (e.result) { 
        case cws.ON: 
            $("#pepper_ligth").html(e.result);
            pepper_status = e.result == cws.ON ? true : false;
            $("#pepper_ligth").addClass("text-success"); 
            break; 
        case cws.CLOSE: 
        case cws.OFF: 
        case cws.ERROR: 
            $("#pepper_ligth").html(e.result); 
            $("#pepper_ligth").addClass("text-danger");
            pepper_status = false; 
            if (onLogOff) goToLogIn();
            break; 
    } 
    break;
```





















