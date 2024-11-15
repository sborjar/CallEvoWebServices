/**
 * CallEvo Inc.
 * Library - CallEvo Web Services for Clicker - CWSCL
 * Date: 2022-12-28
 * Last Release: 2023-01-02
 * version: 1.00 alpha
 */

const CallEvoWebServices = class {

  //#region VARIABLES
  versionSoftware = "CWSCL 1.00 Alpha";
  internaldebug = false;
  appToken = "";
  agentID = 0;
  wsUrl = "";
  aws_websocket = "";
  isConnected = false;
  pepper = null;
  pingString = JSON.stringify({ "action": "ping" });
  keepalive = false;
  URLAPI = "https://apidev.callevo.net/api/public/";
  // URLAPI = "https://api.callevo.net/api/public/";
  usertypes_access = ["30"];
  userID = "";
  user = null;
  isLogged = false;
  selectCampaigns = 0;
  userName = "";
  agentName = "";
  registered = false;
  canSendMessagesWS = true;
  phoneconn = null;
  test = false;
  debug = false;
  isNoCampaigns = false;
  register;
  listenerEvent = null;
  errorCounter = 0;
  errorCounterLimit = 3;
  agent_status = this.CNOTREADY;
  agent_status_last = this.CNOTREADY;
  agent_status_list = [];
  status_agent = false;
  filterDoNotReSend = [];
  isClose = false;
  lastAction = "";
  activeLastAction = false;
  setStatusCame = false;
  setStatusCameStatus = "";
  firstInit = false;
  logged = false;
  wsUrl = "";
  connectionID = "";
  powerOffManually = false;
  doNothingAgentLogIn = false;
  doNothingAgentLogOff = false;
  tenantList = [];
  textMessage = "";
  therePop = false;
  agentLogin = false;

  /** Timers */
  timesError = 0;
  timesErrorLimit = 5;
  timesErrorGlobal = 0;
  timesErrorGlobalLimit = 2;
  timesErrorSend = 0;
  timesErrorSendLimit = 5;
  timesErrorSendTotal = 3;
  timesErrorSendCount = 0;
  timesErrorNoKey = 3;
  timesErrorNoKeyCount = 0;
  generalTimerVariable = null;
  generalTimerStatus = false;
  generalTimerStatus_Ping = false;
  generalTimerCounter_Ping = 0;
  generalTimerInterval_Ping = 120;
  generalTimerStatus_AgentLogin = false;
  generalTimerInterval_AgentLogin = 60;
  generalTimerCounter_AgentLogin = 0;
  generalTimerTrying_AgentLogin = 3;
  generalTimerCounterTrying_AgentLogin = 0;
  generalTimerStatus_SwapStatusAgent = false;
  generalTimerInterval_SwapStatusAgent = 10;
  generalTimerCounter_SwapStatusAgent = 0;
  myCmpData = [];

  /**
  * Messages
  */
  msgStatus = false;;
  msgColor = "";
  msgText = "";
  isError = false;
  timeOffMessage = 0;
  msgTitle = "";
  msg = {};

  //#endregion VARIABLES

  //#region CONSTANTS
  AGENTLOGINTIMEOUT = "AGENTLOGINTIMEOUT";
  AGENTCONNECT = "AGENTCONNECT";
  CANCEL = "CANCEL";
  CONFIRM = "CONFIRM";
  CAGENTLOGIN = "CAGENTLOGIN";
  CAGENTLOGOFF = "CAGENTLOGOFF";
  CMPSTATDATA = "CMPSTATDATA";
  CNOTREADY = "CNOTREADY";
  CLOSE = "CLOSE";
  CREADY = "CREADY";
  CTALKING = "CTALKING";
  DISABLED = "DISABLED";
  ERROR = "ERROR";
  FAIL = "FAIL";
  INFO = "INFO";
  IDCONNECTION = "IDCONNECTION";
  LOG = "LOG";
  LOGOFF = "LOGOFF";
  MANUAL = "manual";
  NOKEY = "NOKEY";
  OK = "OK";
  ON = "ON";
  OFF = "OFF";
  PING = "PING";
  PONG = "PONG";
  PUSH2CAMP = "PUSH2CAMP";
  RELEASERECORD = "RELEASERECORD";
  SETSTATUS = "SETSTATUS";
  SKIP = "SKIP";
  SETVERSION = "SETVERSION";
  SKIPRECORD = "SKIPRECORD";
  SYSTEM = "system";
  WEBRTCMSG = "WEBRTCMSG";
  WEBSOCKET = "WEBSOCKET";
  WHATCAMP = "WHATCAMP";

  //#endregion CONSTANTS

  constructor() { }

  settingsInit = (data) => {
    if (!data) {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `The settingsInit cannot be empty` });
      return false;
    }
    try {
      this.user = data;
      this.userID = this.user.userid;
      this.tenantID = parseInt(data.tenantid);
      this.agentID = parseInt(data.agentid);
      this.email = data.email;
      // this.password = data.pass;
      this.appToken = data.Token;
      this.selectCampaigns = data.selectcmp;
      this.userName = data.username;
      this.agentName = data.fullname;
      this.aws_websocket = data.aws_websocket ?? "fcmjso36b7.execute-api.us-east-1.amazonaws.com";
      this.wsUrl = `wss://${this.aws_websocket}/testing?AuthorizationToken=${this.appToken}&agentid=${this.agentID}`;

      this.agent_status_list = [this.CREADY, this.CNOTREADY];

      if (this.test) this.generalTimers();

      this.changeCustomerAgentStatus(this.LOGOFF, [this.LOGOFF]);
      return true;
    } catch (ex) {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `The settingsInit - ${ex}` });
      return false;
    }
  }

  addEventListener = (e) => {
    try {
      this.listenerEvent = e;
    } catch (ex) { }
  }


  
  //#region APIROUTES
  setHeaders = () => {
    let hdr = {
      'Authorization': `Bearer ${this.appToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Accept,Accept-Language,Content-Language,Content-Type',
      'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
      'User-Data': JSON.stringify({ "userid": this.userID })
    };
    return hdr;
  }

  getAuth = async (data) => {
    let method = "POST";
    let route = "authlogin";
    let params = {
      "email": data.email,
      "password": data.pass,
      "usertype": this.usertypes_access
    };

    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.URLAPI}${route}`,
        type: method,
        data: params,
        success: function (resp) {
          try {
            resp = JSON.parse(resp);
          } catch (ex) { }
          resp.status = resp.status.toUpperCase();
          resolve(resp);
        }
      })
        .fail(function (error) {
          reject({ status: "error", message: error });
        });
    });
  }

  getAuthUser = async (params) => {
    let method = "POST";
    let route = "authuser";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.URLAPI}${route}`,
        type: method,
        data: params,
        success: function (resp) {
          try {
            resp = JSON.parse(resp);
          } catch (ex) { }
          resp.status = resp.status.toUpperCase();
          resolve(resp);
        }
      })
        .fail(function (error) {
          reject({ status: "error", message: error });
        });
    });
  }

  getActiveCampaigns = async () => {
    let route = "newagent/cmp";
    let params = {
      userID: this.userName,
      tenantID: this.tenantID,
      agentID: this.agentID
    };
    let method = "GET";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.URLAPI}${route}`,
        type: method,
        headers: this.setHeaders(),
        data: params,
        success: function (resp) {
          try {
            resp = JSON.parse(resp);
          } catch (ex) { }
          resolve(resp);
        }
      })
        .fail(function (error) {
          reject({ status: "error", message: error });
        });
    });
  }

  login = async (camps) => {
    let route = "newagent/login";
    let params = {
      userID: this.userName,
      tenantID: this.tenantID,
      agentID: this.agentID,
      camp_id: camps,
    };
    let method = "GET";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.URLAPI}${route}`,
        type: method,
        headers: this.setHeaders(),
        data: params,
        success: function (resp) {
          try {
            resp = JSON.parse(resp);
          } catch (ex) { }
          resp.status = resp.status.toUpperCase();
          resolve(resp);
        }
      })
        .fail(function (error) {
          reject({ status: "error", message: error });
        });
    });
  }

  //#endregion APIROUTES

  //#region COMMUNICATION
  conn = () => {
    if (this.debug) console.log("Pepper Connecting... ");
    this.pepper = new WebSocket(this.wsUrl);
    this.pepper.onopen = (event) => this.onOpenListener(event);
    this.pepper.onmessage = (event) => this.onMessageListener(event);
    this.pepper.onclose = (event) => this.onCloseListener(event);
    this.pepper.onerror = (event) => this.onErrorListener(event);
  }

  onOpenListener = (event) => {
    let conn_status = "";
    if (event.type == 'open') {

      this.generalTimerStatus_Ping = this.keepalive;
      conn_status = this.ON;
      this.generalTimerStatus_AgentLogin = true;

      if (!this.generalTimerStatus) {
        this.generalTimers();
      }

      if (!this.agentLogin) {
        if (this.debug) console.log("Sending CAgentLogin ... ");
        this.onSend(this.CAGENTLOGIN, { agentid: this.agentID });
      }

      this.agent_status = this.agent_status_last;
      this.changeCustomerAgentStatus(this.agent_status_last);
    } else {
      conn_status = this.OFF;
      this.pepper = false;
      this.generalTimerStatus_AgentLogin = false;
    }

    this.dispatchEvent({ event: this.WEBSOCKET, result: conn_status })
  }

  onMessageListener = (ev) => {
    let event = null;
    try {
      event = ev.data.trim();
    } catch (ex) {
      event = ev.data
    }

    try {
      event = JSON.parse(event);
    } catch (ex) { }

    if (event == "{\"action\":\"ping\"}") return;
    if (!event) return;

    // if (typeof event === "string") {
    //   if (event.indexOf(this.KICKAGENT) > -1) {
    //     event = JSON.parse(event);
    //   }
    // }

    if (event.hasOwnProperty('connectionid')) {
      this.connectionID = event.connectionid;
    } else if (event.hasOwnProperty('ConnectionID')) {
      this.connectionID = event.ConnectionID;
    } else {
      this.connectionID = "";
    }
    if (this.connectionID != '') this.dispatchEvent({ event: this.IDCONNECTION, connectionid: this.connectionID });

    if (this.debug) console.log(event);

    if (event.hasOwnProperty('action') || event.hasOwnProperty('Action')) {
      this.actionListener(event);
    } else { //if (event.hasOwnProperty('event') || event.hasOwnProperty('eventname') || event.hasOwnProperty('Eventname') || event.hasOwnProperty('EventName')) {
      this.eventListener(event);
    }
  }

  onCloseListener = (event) => {
    let reason = "";
    this.isClose = true;
    switch (event.code) {
      case 1000:
        reason = 'Deliberate disconnection';
        break;
      case 1001:
        reason = `1001 Going away`;
        this.isClose = this.canSendMessagesWS ? false : true;
        break;
      case 1005:
        reason = `Manual Connection 1005, Closed`;
        break;
      case 1006:
        reason = `Error Connection 1006, Closed`;
        this.isClose = this.canSendMessagesWS ? false : true;
        break;
      default:
        break;
    }
    this.pepper = null;
    this.dispatchEvent({ event: this.WEBSOCKET, result: this.CLOSE, status: this.OFF, code: event.code, reason });
    if ([1001, 1006].includes(event.code)) {
      this.reconnectingWebSocket();
    }
  }

  onErrorListener = (event) => {
    if (this.debug) console.log("ERRCONN", event);
    this.pepper = null;
    return this.dispatchEvent({ event: this.WEBSOCKET, result: this.CLOSE, status: "OFF" })
  }

  reconnectingWebSocket = () => {
    if (this.debug) console.log("Reconnecting Web Socket.");
    this.cleanAllTimers();
    if (!this.pepper) this.conn();
    this.timesError++;
    if (this.timesError >= this.timesErrorLimit) {
      this.tryReconnectAgain();
      return;
    }
  };

  tryReconnectAgain() {
    let tw;
    this.cleanAllTimers();
    this.timesErrorGlobal++;
    if (this.timesErrorGlobal < this.timesErrorGlobalLimit) {
      tw = setTimeout(() => {
        this.timesError = 0;
        this.reconnectingWebSocket();
      }, 5000);
    } else {
      this.timesErrorGlobal = 0;
      this.timesError = 0;
    }
  }

  closeConn() {
    try {
      this.pepper.close(1000, 'Deliberate disconnection');
    } catch (ex) { }
  }

  onSend = (action, params = null) => {
    if ([this.PING, this.PONG, this.CNOTREADY].includes(action)) {
      return;
    }

    let dataSend;
    if (params === null) {
      dataSend = JSON.stringify({ action: action });
    } else {
      dataSend = JSON.stringify({ action: action, Parameters: params });
    }

    this.lastAction = dataSend;
    if (this.pepper && this.canSendMessagesWS) {
      try {
        this.pepper.send(dataSend);
        return this.dispatchEvent({ event: this.LOG, type: "»", message: dataSend });
      } catch (ex) { }
    } else {
      return this.dispatchEvent({ event: this.ERROR, status: "OFF", message: "The pepper is disconnected" })
    }
  }
  //#endregion COMMUNICATION

  //#region LISTENER



  actionListener = (data) => {
    let dataResult;
    let dataMessage;
    let dataFixedbody;
    let dataAction;
    if (data.hasOwnProperty("result")) {
      dataResult = data.result;
    } else if (data.hasOwnProperty("Result")) {
      dataResult = data.Result;
    } else {
      dataResult = null;
    }
    if (data.hasOwnProperty("message")) {
      dataMessage = data.message;
    } else if (data.hasOwnProperty("Message")) {
      dataMessage = data.Message;
    } else {
      dataMessage = null;
    }
    if (data.hasOwnProperty("fixedbody")) {
      dataFixedbody = data.fixedbody;
    } else if (data.hasOwnProperty("Fixedbody")) {
      dataFixedbody = data.Fixedbody;
    } else {
      dataFixedbody = null;
    }
    if (data.hasOwnProperty("action")) {
      dataAction = data.action;
    } else if (data.hasOwnProperty("Action")) {
      dataAction = data.Action;
    } else {
      dataAction = null;
    }
    switch (dataAction) {
      case this.CAGENTLOGIN:
        if (dataResult == this.OK) {
          this.agentLogin = true;
          this.onSend("SETVERSION", { version: this.versionSoftware });
          this.agent_status = this.CNOTREADY;
          this.changeCustomerAgentStatus(this.agent_status);
        } else if (dataResult == this.NOKEY) {
          this.timesErrorNoKeyCount++;
          if (this.timesErrorNoKeyCount <= this.timesErrorNoKey) {
            // this.onSend('CAGENTLOGIN', { agentid: this.agentID });
            this.onNoKeyAction()
          } else {
            this.timesErrorNoKeyCount = 0;
          }
        } else {
          this.agentLogin = false;
        }
        this.dispatchEvent({ event: this.CAGENTLOGIN, result: this.agentLogin ? this.ON : this.OFF });
        break;
      case this.KICKAGENT:
        this.pepper.close(1000, 'Deliberate disconnection');
        this.changeCustomerAgentStatus(this.LOGOFF, [this.LOGOFF]);
        this.dispatchEvent({ event: this.WEBRTCMSG, result: this.OFF, status: this.OFF });
        data = { event: dataAction, message: "You have been kick" };
        break;
      case this.PONG:
        if (dataResult != this.OK) {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: 'error result PONG ' + JSON.stringify(data) })
        } else {
          this.dispatchEvent({ event: this.LOG, type: this.INFO, message: this.PONG })
        }
        break;
      case this.SETSTATUS:
        if (dataResult != this.OK) {
          if (dataResult == this.NOKEY) {
            this.onNoKeyAction();
          }
        } else {
          let d = JSON.parse(dataFixedbody);
          if (d.Parameters.status) {
            this.agent_status = d.Parameters.status;
          } else if (d.Parameters.data) {
            this.agent_status = JSON.parse(d.Parameters.data).data;
          }
          this.changeCustomerAgentStatus(this.agent_status);
        }
        break;
      case this.PING:
        if (data.result == this.NOKEY) {
          this.errorCounter++;
          if (this.errorCounter == this.errorCounterLimit) {
            this.errorCounter = 0;
            this.pepper.close(1000, 'Deliberate disconnection');
            data = { event: this.LOGOFF, message: data.message }
          } else {
            let nd = JSON.parse(data.fixedbody);
            this.reconnectingWebSocket();
            return;
          }
        }
        break;
      case this.SETVERSION:
        break;
      case this.PUSH2CAMP:
        let msgError = '';
        switch (dataResult) {
          case 'OK':
            this.currentAction = '';
            this.lastAction = "";
            this.calls_count_push++;
            this.dispatchEvent({ event: this.LOG, type: this.INFO, message: `${this.PUSH2CAMP} ${dataResult}` });
            break;
          case 'FAIL':
            this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${this.PUSH2CAMP} ${dataResult}, ${dataMessage}` });
            this.calls_count_error++;
            msgError = dataMessage;
            this.onSend(this.RELEASERECORD, this.currentParameters);
            break;
          case 'DNC':
            this.calls_count_error++;
            msgError = "Unable to make a call, Can't make a call, this number is on the <b>'Do not call'</b> list";
            this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${this.PUSH2CAMP} ${msgError}` });
            this.onSend(this.RELEASERECORD, this.currentParameters);
            break;
          case 'NOACTIVE':
            this.calls_count_error++;
            msgError = "Unable to make a call, <b>'No campaign available'</b>";
            this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${this.PUSH2CAMP} NO ACTIVE ${msgError}` });
            this.onSend(this.RELEASERECORD, this.currentParameters);
            this.setStatusAgent(this.CNOTREADY);
            break;
          case 'TZ':
            this.calls_count_error++;
            msgError = "Unable to make a call by 'Time Zone'";
            this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${this.PUSH2CAMP} TZ ${msgError}` });
            this.onSend(this.RELEASERECORD, this.currentParameters);
            break;
          default:
            this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${this.PUSH2CAMP} Result: ${dataResult}, Message: ${dataMessage}` });
            msgError = dataMessage;
            this.calls_count_error++;
            this.onSend(this.RELEASERECORD, this.currentParameters);
            break;
        }
        break;
    }
    // this.dispatchEvent(data);
  }

  eventListener = async (event) => {
    let dataResult;
    let dataMessage;
    let dataFixedbody;
    let eventType;
    let eventdata;

    if (event.hasOwnProperty("result")) {
      dataResult = event.result;
    } else if (event.hasOwnProperty("Result")) {
      dataResult = event.Result;
    } else {
      dataResult = null;
    }

    if (event.hasOwnProperty("message")) {
      dataMessage = event.message;
    } else if (event.hasOwnProperty("Message")) {
      dataMessage = event.Message;
    } else {
      dataMessage = null;
    }

    if (event.hasOwnProperty("fixedbody")) {
      dataFixedbody = event.fixedbody;
    } else if (event.hasOwnProperty("Fixedbody")) {
      dataFixedbody = event.Fixedbody;
    } else {
      dataFixedbody = null;
    }

    if (event.hasOwnProperty("eventname")) {
      eventType = event.eventname;
    } else if (event.hasOwnProperty("EventName")) {
      eventType = event.EventName;
    } else {
      eventType = null;
    }

    if (event.hasOwnProperty("data")) {
      eventdata = event.data;
    } else if (event.hasOwnProperty("Data")) {
      eventdata = event.Data;
    } else {
      eventdata = null;
    }

    this.uniqueid = event.callid;

    let found = null;
    let index = null;
    let idx = -1;

    switch (eventType) {
      case this.LOGOFF:
        break;
      case this.CAGENTLOGOFF:
        if (dataResult == this.OK) {
          this.doNothingAgentLogOff = true;
          this.canSendMessagesWS = false;
          this.dispatchEvent(this.CAGENTLOGOFF);
        }
        break;
      case this.AGENTCONNECT:
        this.cameAgentConnect = true;
        this.connectionID = eventdata ?? '';
        this.dispatchEvent({ event: this.AGENTCONNECT, result: this.ON });
        return;
        break;
      case this.SETSTATUS:
        if (this.status_agent) {
          switch (eventdata) {
            case this.CREADY:
            case this.CNOTREADY:
              this.setStatusAgent(eventdata);
              this.changeCustomerAgentStatus(eventdata);
              break;
          }
        }
        return;
        break;
      case this.CMPSTATDATA:
        let cmpStatData = JSON.parse(`[${eventdata}]`);
        cmpStatData.forEach(e => {
          if (e.ctype == "CL" && e.status == 'y' && parseInt(e.tenantid) == this.tenantID) {
            this.cmpStatListener(e);
          }
        });
        break;
      case this.WHATCAMP:
        this.calls_count_total++;
        eventdata = {
          camp_id: parseInt(eventdata.split('|')[0]),
          leadid: parseInt(eventdata.split('|')[1]),
          phone: eventdata.split('|')[2],
          status: this.CREADY
        };
        if (this.agent_status == this.CTALKING) {
          eventdata['status'] = this.CTALKING;
          this.calls_count_release++;
          this.onSend(this.RELEASERECORD, eventdata);
          this.changeCustomerAgentStatus(this.CTALKING, [this.CTALKING]);
        } else if (this.agent_status == this.CNOTREADY) {
          eventdata['status'] = this.CNOTREADY;
          this.calls_count_release++;
          this.onSend(this.RELEASERECORD, eventdata);
          this.changeCustomerAgentStatus(this.CNOTREADY);
        } else {
          if (eventdata.phone === undefined) {
            return;
          } else {
            this.setStatusAgent(this.CTALKING, true, true);
            this.changeCustomerAgentStatus(this.CTALKING, [this.CTALKING]);
            this.therePop = true;
            this.dispatchEvent({ event: this.WHATCAMP, data: eventdata });
          }
        }
        break;
    }
    // return this.dispatchEvent(event);
  }

  cmpStatListener = (cmpData) => {
    let found = false;
    let ar = 0;

    if (this.myCmpData.length > 0) {
      // FIND & UPDATE
      this.myCmpData.forEach((drow, i) => {
        if (drow.cmpID == cmpData.cmpID) {
          found = true;
          this.myCmpData[i].aonline = cmpData.aonline;
          this.myCmpData[i].aready = cmpData.aready;
          this.myCmpData[i].dial_level = cmpData.dial_level;
          this.myCmpData[i].liu = cmpData.liu;
          this.myCmpData[i].answered = cmpData.answered;
          this.myCmpData[i].connectRate = cmpData.connectRate;
          this.myCmpData[i].contacts = cmpData.contacts;
          this.myCmpData[i].contactrate = cmpData.contactrate;
          this.myCmpData[i].cwaiting = cmpData.cwaiting;
          this.myCmpData[i].abandoned = cmpData.abandoned;
          this.myCmpData[i].dropRate = cmpData.dropRate;
          this.myCmpData[i].total = cmpData.total;
          this.myCmpData[i].avgwaiting = cmpData.avgwaiting;
          this.myCmpData[i].maxwaiting = cmpData.maxwaiting;
          this.myCmpData[i].busy = cmpData.busy;
          this.myCmpData[i].amd = cmpData.amd;
          this.myCmpData[i].noa = cmpData.noa;
          this.myCmpData[i].oi = cmpData.oi;
          this.myCmpData[i].fax = cmpData.fax;
          this.myCmpData[i].status = cmpData.status == 'n' ? 'stoppedbig' : 'runningbig';
        }
      });
    }

    if (!found) {
      // NEW -> add row

      let item = {
        cmpID: cmpData.cmpID,
        cmpName: cmpData.cmpName,
        aonline: cmpData.aonline,
        aready: cmpData.aready,
        dial_level: cmpData.dial_level,
        liu: cmpData.liu,
        answered: cmpData.answered,
        connectRate: cmpData.connectRate,
        contacts: cmpData.contacts,
        contactrate: cmpData.contactrate,
        cwaiting: cmpData.cwaiting,
        abandoned: cmpData.abandoned,
        dropRate: cmpData.dropRate,
        total: cmpData.total,
        avgwaiting: cmpData.avgwaiting,
        maxwaiting: cmpData.maxwaiting,
        busy: cmpData.busy,
        amd: cmpData.amd,
        noa: cmpData.noa,
        oi: cmpData.oi,
        fax: cmpData.fax,
        status: cmpData.status == 'n' ? 'stoppedbig' : 'runningbig'
      };
      this.myCmpData.push(item);
    }

    this.dispatchEvent({ event: this.CMPSTATDATA, data: this.myCmpData });

  };
  //#endregion LISTENER

  //#region METHODS

  push2Call = (type = this.CONFIRM, eventdata = []) => {
    this.therePop = false;
    let ctype = "";
    switch (type) {
      case this.CONFIRM:
        this.agent_status = this.CREADY;
        ctype = this.PUSH2CAMP;
        break;
      case this.SKIP:
        this.agent_status = this.CREADY;
        ctype = this.SKIPRECORD;
        this.calls_count_skip++;
        break;
      case this.CANCEL:
        this.agent_status = this.CNOTREADY;
        ctype = this.RELEASERECORD;
        this.calls_count_cancel++;
        break;
      default:
        this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `The type of action «${type}» entered is not within the following options: CONFIRM, CANCEL, SKIP.` })
        return;
    }
    eventdata['status'] = this.agent_status;
    this.setStatusAgent(this.agent_status, true, true, this.MANUAL);
    this.changeCustomerAgentStatus(this.agent_status)
    this.onSend(ctype, eventdata);
  }

  generalTimers = () => {
    if (this.generalTimerStatus) {
      return;
    }
    this.generalTimerStatus = true;
    if (this.debug) console.log("[√] General timers active");

    this.generalTimerVariable = setInterval(() => {
      /**
       * Agent Login timer
       */
      if (this.generalTimerStatus_AgentLogin) {
        this.generalTimerCounter_AgentLogin++;
        if (this.generalTimerCounter_AgentLogin == this.generalTimerInterval_AgentLogin) {
          this.generalTimerCounter_AgentLogin = 0;

          if (!this.agentLogin) {
            this.generalTimerCounterTrying_AgentLogin++;

            this.cleanAllTimers();
            this.closeConn();
            this.dispatchEvent({ event: this.CAGENTLOGIN, result: this.OFF })
            this.agentLogin = false;

            if (this.generalTimerCounterTrying_AgentLogin <= this.generalTimerTrying_AgentLogin) {
              this.conn()
            } else {
              this.generalTimerStatus_AgentLogin = false;
              this.dispatchEvent({ event: this.AGENTLOGINTIMEOUT, message: 'Timeout Logging into the system' });
            }
          }
        }
      }

      /**
       * Swap Agent Status
       */


      if (this.agent_status == this.CREADY) {
        this.generalTimerCounter_SwapStatusAgent++
      } else {
        this.generalTimerCounter_SwapStatusAgent = 0;
      };
      if (this.canSendMessagesWS && this.generalTimerInterval_SwapStatusAgent == this.generalTimerCounter_SwapStatusAgent) {
        this.generalTimerCounter_SwapStatusAgent = 0;
        if (this.agent_status == this.CREADY) {
          this.setStatusAgent(this.CREADY, true, true, this.MANUAL);
        }
      }

      /**
       * Ping
       */

      if (this.generalTimerStatus_Ping) {
        this.generalTimerCounter_Ping++;
        if (this.canSendMessagesWS && this.generalTimerInterval_Ping == this.generalTimerCounter_Ping) {
          this.generalTimerCounter_Ping = 0;
          if (this.pepper) {
            this.pepper.send(this.pingString);
            this.dispatchEvent({ event: this.LOG, type: "»", message: this.PING });
          }
        }
      }
    }, 1000);
  }

  dispatchEvent = (data) => {
    try {
      return this.listenerEvent(data);
    } catch (ex) { }
  }

  onClose = () => {
    this.agentLogin = false;
    this.agent_status = this.LOGOFF;
    this.agent_status_last = this.LOGOFF;
    this.powerOffManually = true;
    this.cleanAllTimers();
    this.changeCustomerAgentStatus(this.agent_status);
    this.onSend(this.CAGENTLOGOFF);
    if (this.pepper) this.pepper.close(1000, 'Deliberate disconnection');
  }

  cleanAllTimers = () => {
    if (this.debug) console.log("[√] General timers off");

    this.generalTimerStatus_Ping = false;
    this.generalTimerStatus_AgentLogin = false;
    this.generalTimerCounter_Ping = 0;
    this.generalTimerCounter_AgentLogin = 0;

    this.generalTimerStatus = false;
    try {
      clearInterval(this.generalTimerVariable);
    } catch (ex) { }
  }

  /** Methods to operations */


  onConvertToSeconds = (time, adding) => {
    let duration = moment.duration(time, 'seconds').asSeconds() + adding;
    return duration;
  };

  toHoursMinutesSeconds = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    let result = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return result;
  };

  changeCustomerAgentStatus = (status, arrList = null) => {
    let html = "";
    if (!arrList) {
      arrList = Object.values(this.agent_status_list);
    }
    this.dispatchEvent({ event: this.SETSTATUS, status: status, list_status: arrList });
  }

  setStatusAgent(status, out = true, force = false, type = this.SYSTEM) {
    if (this.agent_status != status || force) {

      if (status == this.CTALKING) {
      } else {
        if (this.therePop && status != this.CTALKING) {
          return;
        }
        if (out) this.onSend(this.SETSTATUS, { status });
        this.cSwapStatusAgent = 0;
      }
      this.agent_status = status;
      this.agent_status_last = this.agent_status;
    }
    return false;
  }


  onNoKeyAction = () => {
    this.activeLastAction = true;
    if (this.pepper) {
      // this.dispatchEvent({ event: this.LOG, type: this.INFO, message: "NOKEY - The WS lost the connectionID, reconnecting" });
      this.closeConn();
      this.cleanAllTimers();
      this.conn();
    }
  }



  //#endregion METHODS



}