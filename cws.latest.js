/**
 * CallEvo Inc.
 * Library - CallEvo Web Services - CWS
 * Date: 2024-11-15
 * Last Release: 2024-11-15
 * version: 2.00 Alpha
 * Include NATS
 */

const CallEvoWebServices = class {

  //#region VARIABLES
  versionSoftware = "CWS 2.00 Alpha";
  appToken = "";
  agentID = 0;
  wsUrl = "";
  aws_websocket = "";
  isConnected = false;
  pepper = null;
  pingString = JSON.stringify({ "action": "ping" });
  keepalive = false;
  // URLAPI = "https://api.callevo.net/api/public/";
  URLAPI = "https://apidev.callevo.net/api/public/";
  usertypes_access = ["27"];
  userID = "";
  user = null;
  isLogged = false;
  selectCampaigns = 0;
  userName = "";
  agentName = "";
  canRegisterWebRTC = true;
  opaqueID = ""
  registered = false;
  destroyingWebRTC = false;
  donDoNotActiveWebRTC = false;
  canSendMessagesWS = true;
  onDoNotActiveJanus = false;
  phoneconn = null;
  webrtc = null;
  webrtc_server = "wss://janus.callevo.net:8189/";
  webrtc_apisecret = 'Q5ZCfYqzjrK9';
  webrtc_iceservers = [
    { urls: 'stun:stun.callevo.net:3478', username: null, credential: null },
    { urls: 'stun:stun.l.google.com:19302', username: null, credential: null },
    { urls: 'stun:stun1.l.google.com:19302', username: null, credential: null },
  ];
  test = false;
  kamailio = "";
  kamServerIndex = 0;
  authDomain = "";
  kamServers = [];
  asteriskServer = "";
  SipPass = "";
  debug = false;
  webrtcDebug = false;
  register;
  mutedStatus = false;
  listenerEvent = null;
  sipcall;
  dialback;
  activateDialBack = false;
  settingCallBack = false;
  settingCallBackPhone = "";
  errorCounter = 0;
  errorCounterLimit = 3;
  callInfo = [];
  numberLines = null;
  numberLinesByDefault = 2;
  automaticLines = false;
  actual_calls = 0;
  actual_line = 1;
  countCallBacks = 0;
  line = [];
  countActiveCalls = 0;
  outCall = false;
  agent_status = this.NOTREADY;
  agent_status_list = [];
  agent_status_list_hold = [];
  status_agent = false;

  filterDoNotReSend = [];
  isClose = false;
  lastAction = "";
  activeLastAction = false;
  setStatusCame = false;
  setStatusCameStatus = "";
  maxdigitphone = 10;
  firstInit = false;

  logged = false;
  script = "";
  beep = null;
  InsideAdmin = false;
  wsUrl = "";
  connectionID = "";
  uniqueid = "";
  uniqueid1 = "";
  uniqueid2 = "";
  transferCmpData = null;
  transferAgentData = null;
  thereConference = false;
  thereExitConf = false;
  currentCallIsManual = false;
  temp_uniqueid_manual_until_come_infocall = "";
  dataExitConf = "";
  thereSetDispHang = false;
  newStatusSetDisposition = "";
  notReadyManualActivate = false;
  powerOffManually = false;
  doNothingAgentLogIn = false;
  doNothingAgentLogOff = false;
  lstDispositions = [];
  tenantList = [];
  textMessage = "";
  startRecord0 = false;
  startRecord1 = false;
  sDisp = false;
  fDisp = false;
  dDisp = 0;
  buttonsAction = [];

  showCallBack = false;
  lstCallBack = [];
  urlLogin = "";
  urlLogout = "";
  urlbtwCalls = "";
  canShowUrlLogin = false;


  /** Timers */
  timesError = 0;
  timesErrorLimit = 5;
  timesErrorGlobal = 0;
  timesErrorGlobalLimit = 2;
  timesErrorSend = 0;
  timesErrorSendLimit = 5;
  timesErrorSendTotal = 3;
  timesErrorSendCount = 0;
  generalTimerVariable = null;
  generalTimerStatus = false;
  generalTimerStatus_Calls = false;
  generalTimerStatus_Ping = false;
  generalTimerCounter_Ping = 0;
  generalTimerInterval_Ping = 120;
  generalTimerStatus_AgentLogin = false;
  generalTimerInterval_AgentLogin = 60;
  generalTimerCounter_AgentLogin = 0;

  /**OBJECTS */

  o_myvideo = null;
  o_remotevideo = null;
  o_callinfo = null;

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
  READY = "READY";
  NOTREADY = "NOTREADY";
  WRAP = "WRAP";
  BREAK = "BREAK";
  BATHROOM = "BATHROOM";
  MEETING = "MEETING";
  LUNCH = "LUNCH";
  OTHER = "OTHER";
  TALKING = "TALKING";
  ACTIVATE = "ACTIVATE";
  AGENTCAMPAIGN = "AGENTCAMPAIGN";
  AGENTCONNECT = "AGENTCONNECT";
  AGENTLOGIN = "AGENTLOGIN";
  AGENTLOGOFF = "AGENTLOGOFF";
  AGICONNECT = "AGICONNECT";
  AGENTDUMP = "AGENTDUMP";
  BREAKCONFERENCE = "BREAKCONFERENCE";
  BRIDGE = "BRIDGE";
  CALLINFO = "CALLINFO";
  CALLERHANGUP = "CALLERHANGUP";
  COMPLETEAGENT = "COMPLETEAGENT";
  COMPLETECALLER = "COMPLETECALLER";
  CONNECT = "CONNECT";
  CONF = "CONF";
  CHAT2AGENT = "CHAT2AGENT";
  COUNTCALLBACK = "COUNTCALLBACK";
  CONFERENCE = "CONFERENCE";
  CONN = "CONN";
  CLOSE = "CLOSE";
  DOUBLECALL = "DOUBLECALL";
  DIALBACK = "DIALBACK";
  DISCONNECT = "DISCONNECT";
  ERROR = "ERROR";
  ENTERCONF = "ENTERCONF";
  EXITCONF = "EXITCONF";
  GOTOLINE = "GOTOLINE";
  HANGUP = "HANGUP";
  HOLD = "HOLD";
  INFOCALL = "INFOCALL";
  INFO = "INFO";
  KICKAGENT = "KICKAGENT";
  LOG = "LOG";
  LOGOFF = "LOGOFF";
  NOKEY = "NOKEY";
  OUTCALL = "OUTCALL";
  OK = "OK";
  ON = "ON";
  OFF = "OFF";
  PING = "PING";
  PONG = "PONG";
  PREVIEWCALL = "PREVIEWCALL";
  RECALL = "RECALL";
  RETRIEVE = "RETRIEVE";
  SETSTATUS = "SETSTATUS";
  STARTRECORDING = "STARTRECORDING";
  STOPRECORDING = "STOPRECORDING";
  SETDISPHANG = "SETDISPHANG";
  SETDISPHANGALL = "SETDISPHANGALL";
  WEBRTCMSG = "WEBRTCMSG";
  WEBSOCKET = "WEBSOCKET";
  REGISTEROBJECTS = "REGISTEROBJECTS";
  ACTUALLINE = "ACTUALLINE";
  CALLDATA = "CALLDATA";
  LINES = "LINES";
  SCRIPTURL = "SCRIPTURL";
  SUCCESS = "success";
  FAIL = "FAIL";
  FAILDNC = "FAILDNC";
  FAILNOCAMP = "FAILNOCAMP";
  FAILTZ = "FAILTZ";
  CONFIRM = "CONFIRM";
  CANCEL = "CANCEL";
  SKIP = "SKIP";
  PHONEMSG = "PHONEMSG";
  IDCONNECTION = "IDCONNECTION";
  CALLBACK = "CALLBACK";
  AGENTLOGINTIMEOUT = "AGENTLOGINTIMEOUT";
  SELECTROW = "SELECTROW";
  TRANSFER = "TRANSFER";
  SENDDTMF = "SENDDTMF";
  MANUALCALL = "MANUALCALL";
  AGENT = "Agent";
  CAMPAIGN = "Campaign";
  PHONE = "Phone";
  WARN = "WARN";
  SETVERSION = "SETVERSION";
  NEW = "NEW";
  CLEAR = "CLEAR";
  ACTIONBUTTONS = "ACTIONBUTTONS";
  SCRIPTS = "SCRIPTS";
  CANCHANGEAGENTSTATUS = "CANCHANGEAGENTSTATUS";
  DISABLED = "DISABLED";
  VISIBLE = "VISIBLE";
  NUMTRANSFER = "NUMTRANSFER";

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
      this.kamailio = data.kamailio;
      this.authDomain = data.authdomain;
      this.kamServers.push(this.kamailio);
      this.asteriskServer = this.kamailio;
      this.SipPass = data.hashed;
      this.aws_websocket = data.aws_websocket ?? "fcmjso36b7.execute-api.us-east-1.amazonaws.com";
      this.wsUrl = `wss://${this.aws_websocket}/testing?AuthorizationToken=${this.appToken}&agentid=${this.agentID}`;

      this.urlLogin = this.user.urllogin == null ? '' : this.user.urllogin;
      this.urlLogout = this.user.urlLogout == null ? '' : this.user.urlLogout;
      this.urlbtwCalls = this.user.urlbtwcalls == null ? '' : this.user.urlbtwcalls;

      this.agent_status_list = [this.READY, this.NOTREADY];
      this.agent_status_list_hold = [this.READY, this.NOTREADY];

      let statusagentactives = data.statusagent.split("|");
      if (parseInt(statusagentactives[0], 2) == 1) {
        this.agent_status_list.push(this.BREAK);
      }
      if (parseInt(statusagentactives[1], 2) == 1) {
        this.agent_status_list.push(this.BATHROOM);
      }
      if (parseInt(statusagentactives[2], 2) == 1) {
        this.agent_status_list.push(this.MEETING);
      }
      if (parseInt(statusagentactives[3], 2) == 1) {
        this.agent_status_list.push(this.LUNCH);
      }
      if (parseInt(statusagentactives[4], 2) == 1) {
        this.agent_status_list.push(this.OTHER);
      }

      if (this.test) this.generalTimers();

      this.buttonsAction = [
        { ref: this.MANUALCALL },
        { ref: this.HOLD },
        { ref: this.RETRIEVE },
        { ref: this.TRANSFER },
        { ref: this.SENDDTMF },
        { ref: this.BRIDGE },
        { ref: this.CONF },
        { ref: this.DISCONNECT },
        { ref: this.BREAKCONFERENCE },
        { ref: this.RECALL },
        { ref: this.HANGUP },
      ];

      let body = $("body");
      let html = `<div style="display:none;"><video id="myvideo" width="120" height="120" autoplay muted></video><video id="remotevideo" width="120" height="120" autoplay></video></div>`;
      body.append(html);
      this.o_myvideo = $("#myvideo");
      this.o_remotevideo = $("#remotevideo");

      this.changeCustomerAgentStatus(this.LOGOFF, [this.LOGOFF]);
      this.canChangeStatus(false);
      this.enableDisableButtonsAction([]);
      this.btmsAction([
        { idx: 2, value: false },
        { idx: 6, value: false }, //Para conferencias cuando este listo
        { idx: 7, value: false },
        { idx: 8, value: false },
        { idx: 9, value: false },
      ]);

      if (!this.numberLines || this.numberLines < this.numberLinesByDefault) {
        if (this.numberLines == 0) {
          this.automaticLines = true;
        }
        this.numberLines = this.numberLinesByDefault;
      } else {
        this.numberLinesByDefault = this.numberLines;
      }
      if (this.debug) console.log("automaticLines", this.automaticLines);

      this.initLines();

      return true;
    } catch (ex) {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `The settingsInit - ${ex}` });
      return false;
    }
  }

  settingDialBack = (data) => {
    try {
      this.activateDialBack = data.dialback == 1 ? true : false;
      this.settingCallBack = data.dialback == 1 ? true : false;
      this.settingCallBackPhone = data.dialback == 1 ? data.number : "";
      return true;
    } catch (ex) {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${this.DIALBACK} - ${ex}` });
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

  getCampaignsTenant = async () => {
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

  getCallBackData = async () => {
    if (this.test) {
      let cbtest = [];
      cbtest.push({
        id: 1,
        phone: "7201234567",
        campaign: "Test",
        date: "2022-10-07T16:25:46.000000Z"
      });
      cbtest.push({
        id: 2,
        phone: "7201234578",
        campaign: "Test",
        date: "2022-10-08T16:25:46.000000Z"
      });
      this.dispatchEvent({ event: this.CALLBACK, result: cbtest });
      return;
    };

    let route = "callbacks";
    let method = "GET";
    $.ajax({
      url: `${this.URLAPI}${route}`,
      type: method,
      headers: this.setHeaders(),
      success: function (resp) {
        try {
          resp = JSON.parse(resp);
        } catch (ex) { }
        resp.status = resp.status.toUpperCase();
        if (resp.status == this.OK && resp.message.length > 0) {
          let cbdata = [];
          resp.message.forEach(cbe => {
            cbdata.push({
              id: cbe.callbackid,
              phone: cbe.lead_phone,
              campaign: cbe.campaign.camp_name ?? '',
              date: cbe.created_at
            })
          });
          this.dispatchEvent({ event: this.CALLBACK, result: cbdata });
        }
      }
    })
      .fail(function (error) {
        this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${this.CALLBACK}, ${error}` });
      });
  }

  getManualCampaigns = async () => {
    let route = "newagent/get_campaigns";
    let method = "GET";
    let params = {
      userID: this.userName,
      tenantID: this.tenantID,
      agentID: this.agentID
    };
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


  getTransferAgentsData = async () => {
    let route = `newagent/transfer_agents/${this.tenantID}`;
    let method = "GET";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.URLAPI}${route}`,
        type: method,
        headers: this.setHeaders(),
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
  getTransferCampaignData = async () => {
    let route = `newagent/transfer_campaign/${this.tenantID}`;
    let method = "GET";
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.URLAPI}${route}`,
        type: method,
        headers: this.setHeaders(),
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


  //#endregion APIROUTES

  //#region WEBRTC
  startWebRTC = () => {
    if (!Janus.isWebrtcSupported()) {
      this.dispatchEvent({
        event: this.WEBRTCMSG,
        result: this.ERROR,
        status: this.OFF,
        message: "Your browser does not support WebRTC. LC 104"
      });
      return;
    } else {
      if (this.debug) console.log("Your browser supports WebRTC");
    }


    if (this.canRegisterWebRTC) {
      this.opaqueID = 'callevoAPI-' + Janus.randomString(12);
      this.registered = false;
      let that = this;
      try {
        Janus.init({
          debug: this.webrtcDebug,
          callback: function () {
            that.webrtc = new Janus({
              apisecret: that.webrtc_apisecret,
              iceServers: that.webrtc_iceservers,
              server: that.webrtc_server,
              success: function () {
                that.webrtc.attach({
                  plugin: 'janus.plugin.sip',
                  opaqueId: that.opaqueID,
                  success: function (pluginHandle) {
                    that.sipcall = pluginHandle;
                    let message = `Plugin attached! (${that.sipcall.getPlugin()}, id=${that.sipcall.getId()})`;
                    Janus.log(message);
                    if (that.debug) console.log(message);
                    that.WebRTCRegister();
                  },
                  error: function (error) {
                    that.dispatchEvent({
                      event: that.WEBRTCMSG,
                      result: that.ERROR,
                      status: that.OFF,
                      message: error
                    });
                  },
                  consentDialog: function (on) {
                    Janus.debug('Consent dialog should be ' + (on ? 'on' : 'off') + ' now');
                    if (that.debug) console.log('Consent dialog should be ' + (on ? 'ON' : 'OFF') + ' now');
                  },
                  onmessage: function (msg, jsep) {
                    Janus.debug(' ::: Got a message :::');
                    Janus.debug(msg);
                    if (that.debug) console.log("» " + msg.result.event);
                    try {
                      var result = msg.result;
                      var event = msg.result.event;
                    } catch (err) {
                      that.offWebRTC("[6]", msg.error);
                    }

                    var error = msg['error'];
                    if (error != null && error != undefined) {
                      if (!that.registered) {
                        that.offWebRTC("[7]", `Event: ${msg.result.event}. Please contact support.`);
                        return;
                      }
                      that.offWebRTC("[8]", `${error} on ${that.asteriskServer}. Please contact support.`);
                      return;
                    }

                    if (
                      result !== null &&
                      result !== undefined &&
                      result.event !== undefined &&
                      result.event !== null
                    ) {
                      switch (event) {
                        case 'registration_failed':
                          that.dispatchEvent({
                            event: that.WEBRTCMSG,
                            result: that.ERROR,
                            status: that.OFF,
                            message: 'JNS onmessage ' + event
                          });
                          that.loopsregistererror++;
                          if (that.loopsregistererror > 5) {
                            that.loopsregistererror = 0;
                            that.offWebRTC("[9]", `<strong>Registration failed: ${result['code']} ${result['reason']}.<strong>. Please contact support. LC 789`);
                            Janus.warn(`Registration failed: ${result['code']} ${result['reason']}`);
                          } else {
                            if (
                              that.asteriskServer !== null ||
                              that.asteriskServer !== undefined
                            ) {
                              that.register = { request: 'register' };

                              that.register['proxy'] = that.asteriskServer;
                              that.register.authuser = that.userName;
                              that.register.username = `sip:${that.userName}@${that.authDomain}`;
                              that.register.display_name = that.agentName;
                              that.register.sips = true;
                              that.register.send_register = true;
                              that.register['ha1_secret'] = md5(`${that.userName}:${that.authDomain}:${that.SipPass}`);
                              that.sipcall.send({ message: that.register });
                              return;
                            }
                          }
                          break;
                        case 'unregistered':
                          that.dispatchEvent({
                            event: that.WEBRTCMSG,
                            result: that.ERROR,
                            status: that.OFF,
                            message: `WebRTC user Unregistered.`
                          });
                          that.registered = true;
                          break;
                        case 'registered':
                          if (that.debug) console.log("If registered", that.registered);
                          if (that.debug) console.log("DialBack", that.activateDialBack);
                          Janus.log('Successfully registered as ' + result['username'] + '!');
                          if (that.debug) console.log('Successfully registered as ' + result['username'] + '!');
                          if (!that.registered) {
                            if (that.activateDialBack) {
                              if (that.debug) console.log("Dialback Activating");
                              if (that.debug) console.log("Phone", that.settingCallBackPhone);
                              if (that.settingCallBackPhone != '') {
                                let params = {
                                  path: that.settingCallBackPhone,
                                  callback: that.settingCallBack,
                                };
                                that.playRing();
                                that.onSend('ACTIVATE', params);
                              } else {
                                that.dispatchEvent({ event: that.LOG, type: that.ERROR, message: `${that.DIALBACK} - Phone is blank` });
                              }

                            } else {
                              that.CallNumber(`sip:98123${that.userName}@${that.authDomain}`);
                              if (that.debug) console.log(`sip:98123${that.userName}@${that.authDomain}`);
                              that.canRegisterWebRTC = true;
                            }
                          } else {

                          }
                          that.registered = true;
                          if (that.debug) console.log("Registered", that.registered);

                          break;
                        case 'calling':
                          that.playRing();
                          Janus.log('Waiting for the peer to answer...');
                          if (that.debug) console.log('Waiting for the peer to answer...');
                          break;
                        case 'incomingcall':
                          Janus.log(`Incoming call from ${result['username']}!`);
                          if (that.debug) console.log(`Incoming call from ${result['username']}!`);
                          var doAudio = true,
                            doVideo = false;
                          var offerlessInvite = false;
                          if (jsep !== null && jsep !== undefined) {
                            doAudio = jsep.sdp.indexOf('m=audio ') > -1;
                            doVideo = jsep.sdp.indexOf('m=video ') > -1;
                            Janus.debug('Audio ' + (doAudio ? 'has' : 'has NOT') + ' been negotiated');
                            Janus.debug('Video ' + (doVideo ? 'has' : 'has NOT') + ' been negotiated');
                          } else {
                            Janus.log("This call doesn't contain an offer... we'll need to provide one ourselves");
                            if (that.debug) console.log("This call doesn't contain an offer... we'll need to provide one ourselves");
                            offerlessInvite = true;
                            doVideo = false;
                          }
                          var rtpType = '';
                          var srtp = result['srtp'];
                          if (srtp === 'sdes_optional')
                            rtpType = ' (SDES-SRTP offered)';
                          else if (srtp === 'sdes_mandatory')
                            rtpType = ' (SDES-SRTP mandatory)';

                          var extra = '';
                          if (offerlessInvite)
                            extra = ' (no SDP offer provided)';

                          var sipcallAction = offerlessInvite ? that.sipcall.createOffer : that.sipcall.createAnswer;

                          sipcallAction({
                            jsep: jsep,
                            media: { audio: doAudio, video: false },
                            success: function (jsep) {
                              that.incoming = null;

                              Janus.debug(`Got SDP ${jsep.type}! audio=${doAudio}, video=${doVideo}`);
                              Janus.debug(jsep);
                              var body = { request: 'accept' };

                              that.sipcall.send({ message: body, jsep: jsep });
                            },
                            error: function (error) {
                              Janus.error('WebRTC error:', error);
                              var body = { request: 'decline', code: 480 };
                              that.sipcall.send({ message: body });
                              that.offWebRTC("[10]", `WebRTC ${error}`);
                            },
                          });
                          break;
                        case 'accepting':
                          break;
                        case 'progress':
                          Janus.log(`There's early media from ${result['username']}, wairing for the call!`);
                          if (that.debug) console.log(`There's early media from ${result['username']}, wairing for the call!`);
                          Janus.log(jsep);

                          if (jsep !== null && jsep !== undefined) {
                            that.sipcall.handleRemoteJsep({
                              jsep: jsep,
                              error: function (error) {
                                that.offWebRTC("[11]", `Calling Error ${error}`);
                              },
                            });
                          }
                          break;
                        case 'accepted':
                          that.stopRing();
                          Janus.log(`${result['username']} accepted the call!`);
                          if (that.debug) console.log(`${result['username']} accepted the call!`);
                          // Janus.log(jsep);

                          if (jsep !== null && jsep !== undefined) {
                            that.sipcall.handleRemoteJsep({
                              jsep: jsep,
                              error: function (error) {
                                that.offWebRTC("[12]", `Calling Error <strong>${error}</strong>. Please contact support.`);
                              },
                            });
                          }

                          that.InsideAdmin = true;
                          that.dispatchEvent({ event: that.WEBRTCMSG, result: that.ON, status: that.ON });
                          break;
                        case 'hangingup':
                          break;
                        case 'hangup':
                          Janus.log('Call hung up (' + result['code'] + ' ' + result['reason'] + ')!');
                          if (that.debug) console.log('Call hung up (' + result['code'] + ' ' + result['reason'] + ')!');
                          that.sipcall.hangup();
                          that.offWebRTC("[13]", `WebRTC Call hung up (${result['code']} ${result['reason']})!`);
                          that.stopRing();
                          break;
                      }
                    }
                  },
                  onlocalstream: function (stream) {
                    Janus.debug(' ::: Got a local stream :::');
                    Janus.debug(stream);
                    if (that.debug) console.log(' ::: Got a local stream :::');
                    if (that.debug) console.log(stream);
                    try {
                      Janus.attachMediaStream($('#myvideo').get(0), stream);
                      // $('#remotevideo').prop('muted', that.mutedStatus);
                    } catch (ex) {
                      that.offWebRTC("[14]", `onlocalstream ${ex}.`);
                    }

                    var videoTracks = stream.getVideoTracks();
                    if (
                      videoTracks === null ||
                      videoTracks === undefined ||
                      videoTracks.length === 0
                    ) {
                    }
                  },
                  onremotestream: function (stream) {
                    Janus.debug(' ::: Got a remote stream :::');
                    if (that.debug) console.log(' ::: Got a remote stream :::');

                    try {
                      Janus.attachMediaStream($('#remotevideo').get(0), stream);
                      $('#remotevideo').prop('muted', that.mutedStatus);
                    } catch (ex) {
                      that.offWebRTC("[15]", `onremotestream ${ex}.`);
                    }

                    // if (mutedStatus == true) {
                    // 	$("#btmMuteLI button").html('unMute');
                    // } else {
                    // 	$("#btmMuteLI button").html('Mute');
                    // }

                    Janus.debug(stream);
                    if (that.debug) console.log(stream);
                    if ($('#remotevideo').length > 0) {
                      var videoTracks = stream.getVideoTracks();
                      if (videoTracks && videoTracks.length > 0) {
                      }

                      return;
                    }

                    $("#remotevideo").bind("playing", function () {
                    });

                    var videoTracks = stream.getVideoTracks();
                    if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                    }
                  },
                  oncleanup: function () {
                    Janus.log(' ::: Got a cleanup notification :::');
                    if (that.debug) console.log(' ::: Got a cleanup notification :::');
                    that.canSendMessagesWS = false;
                  },
                  detached: function () {
                    that.dispatchEvent({
                      event: that.WEBRTCMSG,
                      result: that.ERROR,
                      status: that.OFF,
                      message: `detached`
                    });
                  },
                });
              },
              error: function (error) {
                Janus.error(error);
                if (that.debug) console.log(errpr);
                that.dispatchEvent({
                  event: that.WEBRTCMSG,
                  result: that.ERROR,
                  status: that.OFF,
                  message: `Connection Refused. WebRTC <strong>${error}</strong>. Please contact support`
                });
              },
              destroyed: function () {
                that.offWebRTC("[17]", `WebRTC destroyed.`);
                that.registered = false;
                if (that.debug) console.log("WebRTC destroyed");
              },
            });
          },
        });
      } catch (ex) {
        that.offWebRTC("[19]", ex);
      }
    }
  }

  WebRTCRegister = (refresh = false) => {
    if (this.debug) console.log("WebRTC register");
    if (this.canRegisterWebRTC || refresh) {
      this.register = {
        request: 'register',
      };

      this.kamServerIndex = 0;

      if (this.debug) console.log("Agent Name: ", this.agentName);
      if (this.agentName === null) {
        that.dispatchEvent({
          event: that.LOG,
          type: that.ERROR,
          message: `Add Camp Login. <strong>Agent Name error</strong>. Please contact support, LC 642`
        });
      } else {
        if (this.kamServers[this.kamServerIndex] != null) {
          if (this.authDomain == '') {
            this.authDomain = 'kamailio.callevo.net';
          }

          this.register['proxy'] = this.kamServers[this.kamServerIndex];
          this.register.authuser = this.userName;
          this.register.username = `sip:${this.userName}@${this.authDomain}`;
          this.register.display_name = this.agentName;
          this.register['ha1_secret'] = md5(
            this.userName + ':' + this.authDomain + ':' + this.SipPass
          );
          this.register['sips'] = true;
          this.register['refresh'] = refresh;
          if (this.debug) console.log(this.register);
          this.sipcall.send({ message: this.register });
        }
      }
    } else {
      that.dispatchEvent({
        event: that.LOG,
        type: that.ERROR,
        message: `Failed Authentication. '<strong>Error getting availables campaigns<strong>. Please contact support. LC 662`
      });
    }
  };

  offWebRTC = (where, reason = "") => {
    this.dispatchEvent({ event: this.LOG, type: this.INFO, message: "offWebRTC " + where });
    if (!this.destroyingWebRTC) {
      this.destroyingWebRTC = true;

      try {
        let unregister = {
          request: 'unregister',
        };
        this.doHangup();
        if (this.kamServers[this.kamServerIndex] != null) {
          unregister['proxy'] = this.asteriskServer;
          unregister['authuser'] = this.userName;
          unregister['username'] = 'sip:' + this.userName + '@' + this.authDomain;
          this.sipcall.send({ message: unregister });
          this.dispatchEvent({ event: this.LOG, type: this.INFO, message: `Unregister sent` });
        }
      } catch (ex) {
      }

      this.dispatchEvent({
        event: this.WEBRTCMSG,
        result: this.ERROR,
        status: this.OFF,
        message: `Close WebRTC ${reason}`
      });

      this.dispatchEvent({
        event: this.PHONEMSG,
        result: this.OFF
      });

      this.canChangeStatus(false);

      try {
        this.sipcall.destroy;
        this.janus.destroy({ janus: 'destroy', transevent: this.opaqueID });
      } catch (ex) {

      }
      this.donDoNotActiveWebRTC = true;
      this.canSendMessagesWS = false;
    }
  };

  verifyWebRTCStatus = () => {
    return this.phoneconn || this.pepper;
  }

  playRing = () => {
    this.beep = new Audio('https://assets.callevo.net/sounds/newringtone.mp3');
    this.beep.volume = 0.1;
    this.beep.loop = true;
    this.beep.play();
  };

  playHangup = () => {
    this.beep = new Audio('https://assets.callevo.net/sounds/hangup.mp3');
    //beep.volume = 0.1;
    this.beep.play();
  };

  playCallsound = () => {
    this.beep = new Audio('https://assets.callevo.net/sounds/beep.mp3');
    //beep.volume = 0.1;
    this.beep.play();
  };

  stopRing = () => {
    try {
      this.beep.loop = false;
      if (this.beep) this.beep.stop();
    } catch (err) { }
  };

  btmMuteFunc = (e) => {
    this.mutedStatus = !this.mutedStatus;

    $('#myvideo').prop('muted', this.mutedStatus);

    if (this.mutedStatus == true) {
    } else {
    }
  }

  CallNumber(number) {
    var doVideo = false;
    let that = this;

    Janus.log(`This is a SIP ${doVideo ? 'video' : 'audio'} call (dovideo=${doVideo})`);

    if (this.sipcall != null) {
      this.sipcall.createOffer({
        media: {
          audio: true,
          video: false,
          failIfNoAudio: true,
          failIfNoVideo: false,
        },
        trickle: true,
        success: function (jsep) {
          Janus.debug('Got SDP!');
          Janus.debug(jsep);
          if (that.debug) console.log('Got SDP!');
          var body = { request: 'call', uri: number };
          that.sipcall.send({ message: body, jsep: jsep });
        },
        error: function (error) {
          let msgErr = error;
          if (error.name && error.name == "NotAllowedError") {
            msgErr = "Your microphone is not activated. You must activate the microphone in your browser.";
          }
          Janus.error('WebRTC error...', error);
          that.dispatchEvent({
            event: that.WEBRTCMSG,
            result: that.ERROR,
            status: that.OFF,
            message: `CallNumber ${JSON.stringify(error)}`
          });
        },
      });
    }
  }

  doHangup = () => {
    var hangup = { request: this.HANGUP };
    this.sipcall.send({ message: hangup });
    this.sipcall.hangup();
    this.onCheckActualCalls();
  };

  //#endregion WEBRTC

  //#region COMMUNICATION
  conn() {
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

      if (!this.donDoNotActiveWebRTC) {
        this.canRegisterWebRTC = true;
        this.startWebRTC();
      }

      if (!this.generalTimerStatus) {
        this.generalTimers();
      }

      if (this.agent_status == this.NOTREADY) {
        this.getCallBackData();
      }

      this.changeCustomerAgentStatus(this.agent_status);
    } else {
      conn_status = this.OFF;
      this.pepper = false;
      this.generalTimerStatus_AgentLogin = false;
    }

    this.dispatchEvent({ event: this.WEBSOCKET, result: conn_status })
  }

  onMessageListener = (ev) => {
    this.countActiveCalls = this.activeCalls();

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

    if (typeof event === "string") {
      if (event.indexOf(this.KICKAGENT) > -1) {
        event = JSON.parse(event);
      }
    }

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
    } else if (event.hasOwnProperty('event') || event.hasOwnProperty('eventname') || event.hasOwnProperty('Eventname')) {
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
        break;
      default:
        break;
    }
    this.pepper = null;
    this.dispatchEvent({ event: this.WEBSOCKET, result: this.CLOSE, status: this.OFF, code: event.code, reason });
    if (event.code == 1001) {
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
    if ([this.PING, this.PONG, this.NOTREADY].includes(action)) {
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
      case this.CHAT2AGENT:
        if (dataResult != cws.OK) {
          data = {
            event: this.CHAT2AGENT,
            result: this.ERROR,
            date: moment().format('YYYY-MM-DD hh:mm:ss'),
            from: this.ERROR,
            to: "",
            message: dataMessage,
            style: 'error',
            connectionid: e.connectionid
          };
        }
        break;
      case this.KICKAGENT:
        this.pepper.close(1000, 'Deliberate disconnection');
        this.changeCustomerAgentStatus(this.LOGOFF, [this.LOGOFF]);
        this.dispatchEvent({ event: this.WEBRTCMSG, result: this.OFF, status: this.OFF });
        data = { event: dataAction, message: "You have been kick" };
        break;
      case this.BRIDGE:
        if (dataResult == this.OK) {
          this.line[0].callstatus = this.BRIDGE;
          this.line[1].callstatus = this.BRIDGE;
          this.updateCallData();
        } else if (dataResult == this.NOKEY) {
          this.onNoKeyAction();
        }
        return;
        break;
      case this.PONG:
        if (dataResult != this.OK) {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: 'error result PONG ' + JSON.stringify(data) })
        } else {
          this.dispatchEvent({ event: this.LOG, type: this.INFO, message: this.PONG })
        }
        return;
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
        return;
        break;
      case this.HANGUP:
        if (dataResult == this.OK) {
          this.setHangUpCall(data.callid);
        }
        return;
        break;
      case this.HOLD:
        if (dataResult == this.SUCCESS) {

          this.line[this.actual_line - 1].callstatus = this.HOLD;
          // this.activeButtonsAction(this.TALKING);
          this.activeButtonsAction(this.HOLD);
          this.updateCallData();
        } else if (dataResult == this.FAIL) {
          if (this.debug) console.log('Unable to put the call on HOLD.');
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: "Unable to put the call on HOLD." });
        }
        return;
        break;
      case this.RETRIEVE:
        if (dataResult == this.SUCCESS) {
          this.line[this.actual_line - 1].callstatus = this.TALKING;
          this.updateCallData();
          this.btmsAction([
            { idx: 1, value: true },
            { idx: 2, value: false },
          ]);
          this.activeButtonsAction(this.RETRIEVE);
        } else if (dataResult == this.FAIL) {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: "Unable to RETRIEVE call." });
        }
        return;
        break;
      case this.ACTIVATE:
        if (dataResult == this.FAIL && dataMessage != "Originate successfully queued") {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `Calling ${this.dialback.number} FAIL.` });
        } else {
          this.dispatchEvent({
            event: this.WEBRTCMSG,
            result: this.ON,
            status: this.ON
          });
          this.stopRing();
        }
        return;
        break;
      case this.OUTCALL:
        let msgError = '';
        if (dataMessage == "Originate successfully queued") {
          this.currentCallIsManual = true;
        } else {
          this.currentCallIsManual = false;
          switch (dataResult) {
            case this.OK:
              break;
            case this.FAILDNC:
              msgError = "Unable to make a call, Can't make a call, this number is on the <b>'Do not call'</b> list";
              this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `OUTCALL ${this.FAILDNC} ${msgError}` });
              break;
            case this.FAILNOCAMP:
              msgError = "Unable to make a call, <b>'No campaign available'</b>";
              this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `OUTCALL ${this.FAILNOCAMP} ${msgError}` });
              break;
            case this.FAILTZ:
              msgError = "Unable to make a call by 'Time Zone'";
              this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `OUTCALL ${this.FAILTZ} ${msgError}` });
              break;
            case this.FAIL:
              if (dataMessage.indexOf('success') < 0) {
                this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `OUTCALL ${this.FAIL} ${dataMessage}` });
              }
              break;
            case this.NOKEY:
              this.onNoKeyAction();
              this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `OUTCALL ${this.NOKEY}` });
              break;
            default:
              if (dataMessage.indexOf('success') < 0) {
                this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `OUTCALL ${this.FAIL} ${dataResult}` });
              }
              break;
          }
        }
        return;
        break;
      case this.CONFERENCE:
        break;
      case this.DISCONNECT:
        if (dataResult == this.OK) {
          this.btmsAction([
            { idx: 6, value: true },
            { idx: 7, value: false },
            { idx: 8, value: false },
            { idx: 9, value: false },
          ]);
        }
        return;
        break;
      case this.BREAKCONFERENCE:
        if (dataResult == this.OK) {
          this.thereConference = false;
          if (this.debug) console.log(`BREAKCONFERENCE ${this.thereConference}`);
          this.btmsAction([
            { idx: 6, value: true },
            { idx: 7, value: false },
            { idx: 8, value: false },
            { idx: 9, value: false },
          ]);
        }
        return;
        break;
      case this.RECALL:
        this.thereConference = false;
        return;
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
        return;
        break;
    }
    this.dispatchEvent(data);
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
    } else if (event.hasOwnProperty("event")) {
      eventType = event.event;
    } else if (event.hasOwnProperty("Event")) {
      eventType = event.Event;
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
      case this.ACTIVATE:
        // this.dispatchEvent({ event: this.DIALBACK, result: e.result, message: e.message, connectionid: e.connectionid });
        this.dispatchEvent({ event: this.LOG, type: this.INFO, message: `${this.DIALBACK} - ${e.result} - ${e.message}` });
        return;
        break;
      case this.HOLD:
      case this.RETRIEVE:
        let cstatus = "";
        idx = this.findRow(event.callid);
        if (idx > -1) {
          this.line[idx].callstatus = eventType == this.HOLD ? eventType : this.TALKING;
          cstatus = this.line[idx].callstatus;
          this.getRowData(idx);
        } else {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `No uniqueID found ${event.callid}` })
        }

        this.activeButtonsAction(this.agent_status);
        this.activeButtonsAction(cstatus);
        return;
        break;
      case this.STARTRECORDING:
        if (event.agent == `Agent/${this.user.agent_code}`) {
          idx = this.findRow(this.uniqueid);
          if (idx != -1) {
            this.dispatchEvent({ event: this.STARTRECORDING, result: this.OK, id: idx + 1 });
          }
        }
        return;
        break;
      case this.STOPRECORDING:
        if (event.agent == `Agent/${this.user.agent_code}`) {
          idx = this.findRow(this.uniqueid);
          if (idx != -1) {
            this.dispatchEvent({ event: this.STOPRECORDING, result: this.OK, id: idx + 1 });
          }
        }
        return;
        break;
      case this.PREVIEWCALL:
        let camp_id = parseInt(eventdata.split('|')[0]);
        let leadid = parseInt(eventdata.split('|')[1]);
        let phone = eventdata.split('|')[2];

        if (phone === undefined || phone == '') {
        } else {
          event = {
            event: this.PREVIEWCALL,
            camp_id: camp_id,
            phone: phone,
            leadid: leadid,
            option: ""
          }
          this.dispatchEvent(event);
        }
        return;
        break;
      case this.AGENTLOGIN:
        if (event.agent == `Agent/${this.user.agent_code}`) {
          this.dispatchEvent({ event: this.PHONEMSG, result: this.ON });
          this.phoneconn = true;

          this.cameAgentLogin = true;
          this.generalTimerStatus_AgentLogin = false;
          this.canSendMessagesWS = true;

          this.onSend(this.SETVERSION, { version: this.versionSoftware });
          if (this.agent_status == undefined) {
            this.agent_status = this.NOTREADY;
          }
          this.onSend(this.SETSTATUS, { status: this.agent_status });
          this.changeCustomerAgentStatus(this.agent_status);
          this.canChangeStatus(true);
          this.dispatchEvent({ event: this.AGENTLOGIN, result: this.OK });
          this.activeButtonsAction(this.agent_status);

          // if (this.agent_status == this.NOTREADY && (this.urlLogin != '' || this.urlLogin != undefined)) {
          //     this.canShowUrlLogin = false;
          //     $(`#script999`).attr('src', "about:blank");
          //     $(`#script999`).attr('src', this.urlLogin);
          //     $(`#script999`).removeClass("hide");
          // }
        } else {
        }
        return;
        break;
      case this.LOGOFF:
        break;
      case this.AGENTLOGOFF:
        if (event.agent == `Agent/${this.user.agent_code}`) {
          this.doNothingAgentLogOff = true;
          this.canSendMessagesWS = false;
          if (this.verifyWebRTCStatus()) {
            this.offWebRTC("[5]", "AGENTLOGOFF");
          }
          if (this.powerOffManually) {
            this.powerOffManually = false;
            this.onClose();
          }
        }
        break;
      case this.AGENTCONNECT:
        this.cameAgentConnect = true;
        this.connectionID = eventdata ?? '';
        return;
        break;
      case this.GOTOLINE:
        let activelines = this.activeCalls();
        if (activelines > 0) {
          let line_source = parseInt(event.data);
          idx = line_source - 1;
          this.getRowData(idx);
        }
        return;
        break;
      case this.INFOCALL:
        this.callInfo = event;
        this.callInfo.data = JSON.parse(event.data);
        this.callInfo['uniqueid'] = this.callInfo.callid;
        this.callInfo['uniqueid_old'] = this.callInfo.callid;
        this.callInfo['callid'] = this.callInfo.data.callid;
        this.callInfo.data['agentid'] = this.agentID;
        this.callInfo.data.sdisp = this.callInfo.data.sdisp == 'n' ? false : true;
        this.callInfo.data.fdisp = this.callInfo.data.fdisp == 'n' ? false : true;
        let TLead = this.callInfo.data.TLead;
        TLead = TLead.replace(/nbsp|&nbsp;|<p>/g, " ");
        TLead = TLead.replace(/<\/p>/g, "<br>");
        TLead = TLead.replace(/[^<b></b><br>A-Za-z0-9_@.,:#\s]+/g, " ");
        this.callInfo.data.TLead = TLead;

        let tUrl = this.callInfo.data.url;
        if (tUrl && tUrl != '') {
          if (tUrl.indexOf("CALLID") < 0 && tUrl.indexOf("AGENTID") < 0 && tUrl.indexOf("TOKEN") < 0) {
            tUrl = `${tUrl}&CALLID=${this.callInfo.data.callid}&AGENTID=${this.agentID}&TOKEN=${this.appToken}`;
          }
        } else {
          tUrl = '';
        }
        this.callInfo.data.url = tUrl;
        this.callInfo.url = tUrl;

        /**
         * Status permitidos
         */
        let allowedStatus = [];
        if (this.countActiveCalls == 0) {
          if (this.outCall) {
            this.outCall = false;
            allowedStatus = [this.READY, this.NOTREADY];
          } else {
            allowedStatus = [this.READY];
          }
        } else {
          allowedStatus = [this.NOTREADY];
        }

        // if (this.debug) console.log("allowedStatus", allowedStatus);

        /***
         * Evaluamos si es double call o no
         * y si es segunda llamada
         */
        if (this.countActiveCalls > 0) {
          try {
            if (!allowedStatus.includes(this.agent_status)) {
              if (
                this.line[this.actual_line - 1].callid != this.callInfo.data.callid &&
                this.line[this.actual_line - 1].callstatus == this.TALKING
              ) {
                if (this.debug) console.log(this.DOUBLECALL, this.callInfo.uniqueid);
                return;
              }
            }
          } catch (ex) {
            return this.dispatchEvent({ event: this.ERROR, message: "Any issue with CallID " + ex })
          }
        }

        let count = 0;
        this.line.forEach((element, idx) => {
          if (element.callid == this.callInfo.callid) {
            count++;
          }
        });

        if (this.automaticLines) {
          let acalls = this.activeCalls();
          if ((acalls + 1) == this.line.length) {
            this.numberLines++;
            this.line.push({ id: this.numberLines, uniqueid: "", callid: -1, phone: '', time: '', callstatus: '', url: '' });
            this.createElementsScript(0);
          }
        }

        let index = -1;
        let asignado = false;
        if (count == 0) {
          for (let idx = 0; idx <= this.numberLines - 1; idx++) {
            if (this.line[idx].uniqueid == '' && !asignado) {
              index = idx;
              asignado = true;
            }
          }
        }

        if (index == -1) {
          if (this.debug) console.log(`Only ${this.numberLines} lines are defined.`)
          return;
        }

        this.callInfo.id = index + 1;
        this.callInfo.phone = this.callInfo.data.phone;
        this.callInfo.time = "00:00:00";
        this.agent_status = this.thereConference ? this.CONF : this.TALKING;
        this.callInfo.callstatus = this.agent_status;
        this.sDisp = this.callInfo.data.sdisp;
        this.fDisp = this.callInfo.data.fdisp;
        this.dDisp = this.callInfo.data.ddisp;

        this.line[index] = this.callInfo;

        if (this.debug) console.log("INFOCALL ADDED", this.callInfo.data.callid);

        this.actual_line = this.line[index].id;

        // try {
        //   this.o_callinfo.html(this.line[index].data.TLead);
        //   this.o_callinfo.removeClass("hide");
        // } catch (ex) {
        //   if (this.debug) console.log("CallData", ex);
        // }

        // try {
        //     $(`#script${this.actual_line}`).attr("src", this.line[index].data.url);
        // } catch (ex) {
        //     if (this.debug) console.log("script url", ex);
        // }

        if (!this.generalTimerStatus_Calls) this.generalTimerStatus_Calls = true;
        this.changeCustomerAgentStatus(this.agent_status, [this.agent_status]);
        this.getRowData(index);
        this.playCallsound();
        this.canChangeStatus(false);

        return;
        break;
      case this.CONNECT:
        return;
        break;
      case this.AGICONNECT:
        found = false;
        let idxAgi = -1;

        this.line.forEach((element, idx) => {
          if (element.callid == parseInt(eventdata)) {
            idxAgi = idx;
            found = true;
            // exit;
          }
        });

        if (found) {
          this.line[idxAgi].uniqueid = event.callid;
          this.line[idxAgi].servername = event.servername;
          this.line[idxAgi].serverip = event.serverip;
          if (this.debug) console.log(`AGICONNECT UniqueID ${this.line[idxAgi].uniqueid}, replacing`);
          this.line[idxAgi].time = "00:00:00";
          this.callInfoActivate = true;
          this.setStatusAgent(this.TALKING);
          this.changeCustomerAgentStatus(this.TALKING, [this.TALKING]);
          this.activeButtonsAction(this.agent_status);
        } else {
          if (this.currentCallIsManual) {
            this.temp_uniqueid_manual_until_come_infocall = event;
          } else {
            if (this.debug) console.log("AGICONNECT not found");
            this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: "AGICONNECT not found" });
          }
        }
        return;
        break;
      case this.CALLINFO:
        return;
        break;
      case this.COMPLETEAGENT:
      case this.CALLERHANGUP:
      case this.COMPLETECALLER:
        this.currentCallIsManual = false;
        idx = this.findRow(this.uniqueid);
        if (idx > -1) {
          try {
            if (this.line[idx].callstatus != '' && this.line[idx].callstatus != this.HANGUP) {

              this.line[idx].callstatus = this.HANGUP;
              this.updateCallData();

              let howmany_calls_active = this.onCheckActualCalls([this.TALKING, this.HOLD, this.CONF, this.BRIDGE]);
              if (isNaN(howmany_talking)) howmany_talking = 0;

              if (howmany_calls_active == 0) {
                this.setStatusAgent(this.WRAP, false);
                this.changeCustomerAgentStatus(this.WRAP, [this.WRAP]);
                this.canChangeStatus(false);
                this.activeButtonsAction(this.WRAP);
              }
            }

          } catch (ex) {
          }
        } else {
          let msgCC = `${this.uniqueid} do not found !!!`
        }
        return;
        break;
      case this.AGENTDUMP:
        return;
        break;
      case this.CONFERENCE:
        let uniqueid1 = event.callid;
        let uniqueid2 = event.queuename;

        let idx0 = this.findRow(uniqueid1);
        let idx1 = this.findRow(uniqueid2);

        if (idx0 != -1 && idx1 != -1) {
          this.line[idx0].callstatus = this.CONF;
          this.line[idx1].callstatus = this.CONF;
          this.getRowData(idx0);
        } else {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `UniqueID do not found ${uniqueid1} vs ${uniqueid2}` })
        }
        this.activeButtonsAction(this.agent_status);
        return;
        break;
      case this.BRIDGE:
        let unique_id1 = event.callid;
        let unique_id2 = event.queuename;

        let idx_0 = this.findRow(unique_id1);
        let idx_1 = this.findRow(unique_id2);

        if (idx_0 != -1 && idx_1 != -1) {
          this.line[idx_0].callstatus = this.BRIDGE;
          this.line[idx_1].callstatus = this.BRIDGE;
          this.getRowData(idx_0);
        } else {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `UniqueID do not found ${uniqueid1} vs ${uniqueid2}` })
        }
        this.activeButtonsAction(this.agent_status);
        return;
        break;
      case this.BREAKCONFERENCE:
        this.thereConference = false;
        this.line.forEach((e, idx) => {
          if (this.line[idx].callstatus != '') {
            this.line[idx].callstatus = this.HOLD;
          }
        });
        this.btmsAction([
          { idx: 6, value: true },
          { idx: 7, value: false },
          { idx: 8, value: false },
          { idx: 9, value: false },
        ]);
        this.getRowData(0);
        return;
        break;
      case this.RECALL:
        this.thereConference = false;
        return;
        break;
      case this.ENTERCONF:
        this.dataExitConf = '';
        this.thereConference = true;
        this.btmsAction([
          { idx: 6, value: false },
          { idx: 7, value: true },
          { idx: 8, value: true },
          { idx: 9, value: false },
        ]);
        idx = this.findRow(this.uniqueid);
        if (idx > -1) {
          try {
            if (this.line[idx].callstatus != '') {
              this.line[idx].callstatus = this.CONF;
            }

          } catch (ex) {
            this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `ENTERCONF Error ${ex}` })
          }
          this.activeButtonsAction(this.CONF);
        } else {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `ENTERCONF UniqueId ${this.uniqueid} do not found !!!` })
        }
        this.updateCallData();
        return;
        break;
      case this.EXITCONF:
        if (this.thereConference) {
          if (this.agent_status == this.READY || this.agent_status == this.WRAP) {
            return;
          }

          let actionExitConf = parseInt(eventdata.split('|')[0]);
          this.dataExitConf = this.uniqueid;
          this.thereExitConf = true;
          this.thereConference = false;

          switch (actionExitConf) {
            case 1:
              this.btmsAction([
                { idx: 6, value: false },
                { idx: 7, value: true },
                { idx: 8, value: true },
                { idx: 9, value: false },
              ]);
              break;
            case 2:
              this.cleanRecordCall(this.dataExitConf);
              idx = this.findRow(this.dataExitConf);
              let oidx = idx == 0 ? 1 : 0;
              this.line[oidx].callstatus = this.TALKING;
              this.btmsAction([
                { idx: 6, value: false },
                { idx: 7, value: true },
                { idx: 8, value: false },
                { idx: 9, value: true },
              ]);
              break;
            case 3:
              this.btmsAction([
                { idx: 6, value: false },
                { idx: 7, value: true },
                { idx: 8, value: false },
                { idx: 9, value: false },
              ]);
              for (let idx = 0; idx <= this.numberLines - 1; idx++) {
                if (this.line[idx].callstatus != '')
                  this.line[idx].callstatus = this.HANGUP;
              }
              this.setStatusAgent(this.WRAP, false);
              this.changeCustomerAgentStatus(this.WRAP, [this.WRAP]);
              break;
          }
          this.updateCallData();
        }
        return;
        break;
      case this.DISCONNECT:
        this.btmsAction([
          { idx: 6, value: true },
          { idx: 7, value: false },
          { idx: 8, value: false },
          { idx: 9, value: false },
        ]);
        this.thereConference = false;
        idx = this.findRow(this.uniqueid);
        if (idx > -1) {
          for (let idx = 0; idx <= this.numberLines - 1; idx++) {
            if (this.line[idx].callstatus != '')
              this.line[idx].callstatus = this.HANGUP;
          }
          this.setStatusAgent(this.WRAP);
          this.changeCustomerAgentStatus(this.WRAP, [this.WRAP]);
        } else {
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `DISCONNECT UniqueId ${this.uniqueid} do not found !!!` })
        }
        return;
        break;
      case this.SETSTATUS:
        this.canChangeStatus(true);

        if (this.activeCalls() > 0) {
          this.canChangeStatus(false);
        }

        if (this.status_agent) {
          switch (eventdata) {
            case this.READY:
            case this.NOTREADY:
              this.setStatusAgent(eventdata);

              this.changeCustomerAgentStatus(eventdata);
              break;
          }
        }
        this.thereSetDispHang = false;
        this.thereConference = false;
        return;
        break;
      case this.NUMTRANSFER:
        this.currentCallIsManual = false;
        this.thereSetDispHang = true;
        this.canChangeStatus(true);
        this.llegoSetDisp = true;
        this.typeSetDisp = 1;

        idx = this.uniqueid == undefined ? -1 : this.findRow(this.uniqueid);
        if (idx == -1) {
          this.dispatchEvent({ event: this.LOG, type: this.WARN, message: `UniqueID ${this.uniqueid} do not found, so, do not disposed` })
        } else {
          /** CHANGE TO HANGUP*/
          let currentstatus = this.line[idx].callstatus;
          if (currentstatus != this.HANGUP) {
            this.line[idx].callstatus = this.HANGUP;
            this.updateCallData();
            this.playHangup();
          }
          this.setHangUpCall(event.callid);

          if (this.activeCalls() == 0) {
            this.canChangeStatus(true);
            this.canPowerOff(true);

            let data = eventdata.split("|");
            this.agent_status = data[3];
            if (this.agent_status == "") this.agent_status = this.READY;
            this.onSend(this.SETSTATUS, { status: this.agent_status });
            this.changeCustomerAgentStatus(this.agent_status);
            this.activeButtonsAction(this.agent_status);
            this.initLines();

            if (this.agent_status == this.NOTREADY) {
              this.getCallBackData();
            }
          } else {
            this.canChangeStatus(false);
            this.canPowerOff(false);
          }
          this.onCheckActualCalls();
          this.getRowData();
          this.updateCallData();

        }
        return;
        break;
      case this.SETDISPHANG:
        this.currentCallIsManual = false;
        this.thereSetDispHang = true;
        this.canChangeStatus(true);
        this.llegoSetDisp = true;
        this.typeSetDisp = 1;

        idx = this.uniqueid == undefined ? -1 : this.findRow(this.uniqueid);
        if (idx == -1) {
          this.dispatchEvent({ event: this.LOG, type: this.WARN, message: `UniqueID ${this.uniqueid} do not found, so, do not disposed` })
        } else {
          /** CHANGE TO HANGUP*/
          let currentstatus = this.line[idx].callstatus;
          if (currentstatus != this.HANGUP) {
            this.line[idx].callstatus = this.HANGUP;
            this.updateCallData();
            this.playHangup();
          }
          this.setHangUpCall(event.callid);

          if (this.activeCalls() == 0) {
            this.canChangeStatus(true);
            this.canPowerOff(true);

            let data = eventdata.split("|");
            this.agent_status = data[1];
            if (this.agent_status == "") this.agent_status = this.READY;
            this.onSend(this.SETSTATUS, { status: this.agent_status });
            this.changeCustomerAgentStatus(this.agent_status);
            this.activeButtonsAction(this.agent_status);
            this.initLines();

            if (this.agent_status == this.NOTREADY) {
              this.getCallBackData();
            }
          } else {
            this.canChangeStatus(false);
            this.canPowerOff(false);
          }
          this.onCheckActualCalls();
          this.getRowData();
          this.updateCallData();

        }
        return;
        break;
      case this.SETDISPHANGALL:
        this.currentCallIsManual = false;
        this.thereSetDispHang = true;
        this.canChangeStatus(true);
        this.llegoSetDisp = true;
        this.typeSetDisp = 2;
        this.canPowerOff(true);

        if (this.thereConference) {
          this.thereConference = false;
        }

        for (let idx = 0; idx <= this.numberLines - 1; idx++) {
          if (this.line[idx].callstatus != '') {
            this.line[idx].callstatus = this.HANGUP;
            this.updateCallData();
          }
        }

        this.playHangup();
        this.cleanRecordCall(null, true);
        this.updateCallData();

        let data = eventdata.split("|");
        this.agent_status = data[1];
        if (this.agent_status == "") this.agent_status = this.READY;
        this.onSend(this.SETSTATUS, { status: this.agent_status });

        this.activeButtonsAction(this.agent_status);
        this.changeCustomerAgentStatus(this.agent_status);
        this.onCheckActualCalls();

        if (this.agent_status == this.NOTREADY) {
          this.getCallBackData();
        }

        return;
        break;
      case this.CHAT2AGENT:
        let jdata = JSON.parse(event.data ?? event.Data);
        let from_agent_code = jdata.from.split('|')[0];
        let from_agent_name = jdata.from.split('|')[1];
        let message = jdata.msg;
        event = {
          event: this.CHAT2AGENT,
          result: this.OK,
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
          from: from_agent_name,
          to: "",
          message: event.message,
          style: 'receives',
          connectionid: e.connectionid
        };
        break;
    }
    return this.dispatchEvent(event);
  }
  //#endregion LISTENER

  //#region METHODS

  initLines = () => {
    this.line = [];
    this.numberLines = this.numberLinesByDefault;
    for (let i = 0; i <= this.numberLines - 1; i++) {
      this.line.push({ id: i + 1, uniqueid: "", callid: -1, phone: '', time: '', callstatus: '', url: '' });
    }
    // this.createElementsScript(0);
    this.updateCallData(this.CLEAR);
  }

  createElementsScript = (nLines = 999) => {
    this.updateCallData(this.NEW);
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
          this.generalTimerStatus_AgentLogin = false;

          if (!this.cameAgentLogin) {
            this.cleanAllTimers();
            this.dispatchEvent({ event: this.AGENTLOGINTIMEOUT, message: 'Timeout Logging into the system' });
            this.closeConn();
            this.offWebRTC("[2]", "The AGENTLOGIN did not come.");
            this.logout();
            this.cameAgentLogin = false;
            this.janus = null;
          }
        }
      }

      /**
       * COUNTER: When a call is active
       */
      if (this.generalTimerStatus_Calls) {
        let countValid = 0;
        for (let index = 0; index < this.numberLines; index++) {
          if (this.line[index].time != '' && this.line[index].callstatus != this.HANGUP) {
            countValid++;
            this.line[index].time = this.toHoursMinutesSeconds(
              this.onConvertToSeconds(this.line[index].time, 1)
            );
            this.updateCallData();
          }
        }
        if (countValid == 0) {
          this.onCheckActualCalls();
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
    this.onSend("LOGOFF");
    this.cleanAllTimers();
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
  activeCalls = () => {
    let count = 0;
    this.line.forEach((e) => {
      if ([this.HOLD, this.HANGUP, this.TALKING, this.BRIDGE, this.CONF].includes(e.callstatus) && e.uniqueid != '') {
        count++;
      }
    });
    return count;
  }

  getRowData = (idx = 0) => {
    let countActiveCalls = this.activeCalls();
    let callstatus = '';

    if (countActiveCalls == 0) {
      idx = 0;
      this.actual_line = idx + 1;
      this.dispatchEvent({ event: this.SELECTROW, row: this.actual_line, url: this.line[idx].url, callinfo: this.line[idx].data && this.line[idx].data.TLead != '' ? this.line[idx].data.TLead : "" });
    } else {
      let howmany_talking = this.onCheckActualCalls([this.TALKING]);
      let howmany_hold = this.onCheckActualCalls([this.HOLD]);
      let howmany_conf = this.onCheckActualCalls([this.CONF]);
      let howmany_bridge = this.onCheckActualCalls([this.BRIDGE]);
      let id_calls_talking = this.whichLineIsActive(this.TALKING);
      let id_calls_hold = this.whichLineIsActive(this.HOLD);
      let id_calls_conf = this.whichLineIsActive(this.CONF);
      let id_calls_brigde = this.whichLineIsActive(this.BRIDGE);

      let actual_calls = howmany_talking + howmany_hold + howmany_conf + howmany_bridge;
      if (actual_calls > 0) {
        if (howmany_conf > 0) {
          idx = id_calls_conf - 1;
        } else if (id_calls_brigde > 0) {
          idx = id_calls_brigde - 1;
        } else if (id_calls_talking > 0) {
          idx = id_calls_talking - 1;
        } else if (howmany_hold == 1) {
          // idx = id_calls_hold -1 ;
        }
      }

      let currentCallStatus = this.line[idx].callstatus;
      if (currentCallStatus == "" && (howmany_talking + howmany_conf + howmany_bridge) == 0) {
        callstatus = this.NOTREADY;
      } else if (currentCallStatus == this.HOLD) {
        callstatus = this.NOTREADY;
      } else {
        callstatus = this.TALKING;
      }

      this.actual_line = idx + 1;
      this.dispatchEvent({ event: this.SELECTROW, row: this.actual_line, url: this.line[idx].url, callinfo: this.line[idx].data && this.line[idx].data.TLead != '' ? this.line[idx].data.TLead : "" });

      //aqui
      // try {
      //   if (this.line[idx].data && this.line[idx].data.TLead != '') {
      //     this.o_callinfo.html(this.line[idx].data.TLead);
      //   } else {
      //     this.o_callinfo.html("");
      //   }
      //   this.o_callinfo.removeClass("hide");
      // } catch (ex) {
      //   if (this.debug) console.log("CallData", ex);
      // }
      this.updateCallData();

      if (callstatus != '') {
        this.setStatusAgent(callstatus, false);
        this.changeCustomerAgentStatus(callstatus);
        if (currentCallStatus == "") {
          this.changeCustomerAgentStatus(callstatus, [callstatus]);
        }
      }
      // this.activeButtonsAction(currentCallStatus);
      if (callstatus == this.TALKING) this.changeCustomerAgentStatus(callstatus, [callstatus]);
      this.canChangeStatus(false);
    }
  }

  whichLineIsActive = (what = this.TALKING) => {
    let id = 0
    this.line.forEach((element, idx) => {
      if (element.callstatus == what && id == 0) {
        id = element.id;
      }
    });
    return id;
  }

  setHangUpCall = (uniqueid = null, hide = true) => {
    this.cleanRecordCall(uniqueid, hide);
    this.onCheckActualCalls();
  };

  cleanRecordCall = (uniqueid = null, hide = true) => {
    let operation = "";

    if (uniqueid != null) {
      let idx = this.findRow(uniqueid);
      try {
        if (idx >= 0 && idx <= this.numberLines - 1) {
          this.line[idx] = { id: idx + 1, uniqueid: "", callid: -1, phone: '', time: '', callstatus: '', url: '' };
        } else {
          let m = `Error Clean scripts uniqueid ${uniqueid} NOT FOUND, so do not clean the script`;
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: m });
        }
      } catch (ex) {
        this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: ex });
      }
    } else {
      this.generalTimerStatus_Calls = false;
      this.initLines();
    }
    this.updateCallData(operation);
    if (operation == this.CLEAR) {
      this.createElementsScript(0);
    }
  };


  findRow = (uniqueid) => {
    if (uniqueid === undefined) {
      if (this.debug) console.log("info", "Uniqueid is undefined");
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: 'Uniqueid is undefined' });
      return -1;
    }
    let sendIdx = -1;
    this.line.forEach((element, idx) => {
      if (element.uniqueid == uniqueid || element.uniqueid_old == uniqueid) {
        sendIdx = idx;
      }
    });
    return sendIdx;
  };

  selectRow = (data) => {
    let sendIdx = parseInt(data[0] - 1);
    if (sendIdx >= 0 && sendIdx <= this.numberLines - 1) {
      this.getRowData(sendIdx);
    }
  };

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

  onCheckActualCalls(status = []) {
    let count = 0;
    this.line.forEach((element) => {
      if (status.length == 0) {
        if (element.phone != '' || element.callstatus != '') {
          count++;
        }
      } else {
        if (status.includes(element.callstatus)) {
          count++;
        }
      }
    });

    if (status.length == 0) {
      if (count == 0) {
        this.generalTimerStatus_Calls = false;
        //aqui
      } else {
        this.generalTimerStatus_Calls = true;
      }
      this.actual_calls = count;
    }
    return count;
  }

  changeCustomerAgentStatus = (status, arrList = null) => {
    let html = "";
    if (!arrList) {
      arrList = Object.values(this.agent_status_list);
    }
    this.dispatchEvent({ event: this.SETSTATUS, status: status, list_status: arrList });
    this.activeButtonsAction(status);
  }

  updateCallData = (operation = "") => {
    let ccall = [];
    this.line.forEach((e) => {
      if (e.hasOwnProperty("id")) {
        ccall.push({
          id: e.id,
          phone: e.phone,
          time: e.time,
          callstatus: e.callstatus,
          uniqueid: e.uniqueid,
          url: e.url ?? ""
        });
      } else {
        ccall.push({
          id: e.id,
          phone: "",
          time: "",
          callstatus: "",
          uniqueid: "",
          url: ""
        });
      }
    });
    let ccd = { event: this.CALLDATA, result: ccall, operation: operation };
    this.dispatchEvent(ccd);
  }

  setStatusAgent(status, out = true) {
    this.activateForceToReady = false;
    this.onCheckActualCalls();

    let countActiveCalls = this.activeCalls();
    let canChange = false;
    let forceChange = false;
    let talkingCount = this.onCheckActualCalls([this.TALKING, this.HOLD, this.BRIDGE, this.CONF]);
    let hangupCount = this.onCheckActualCalls([this.HANGUP]);

    if (countActiveCalls == 0) {
      if ([this.READY, this.NOTREADY, this.WRAP, this.BREAK, this.BATHROOM, this.MEETING, this.LUNCH, this.OTHER].includes(status)) {
        canChange = true;
        if (status != this.WRAP) {
          this.canPowerOff(true);

          if (status == this.READY || status == this.NOTREADY) {
            this.btmsAction([
              { idx: 6, value: true },
              { idx: 7, value: false },
              { idx: 8, value: false },
              { idx: 9, value: false },
            ]);
          }

          if ([this.NOTREADY, this.BREAK, this.BATHROOM, this.MEETING, this.LUNCH, this.OTHER].includes(status)) {
            this.notReadyManualActivate = true;
          } else {
            this.notReadyManualActivate = false;
          }
        } else {
          this.agent_status = this.WRAP;
          this.canPowerOff(false);
        }

        if (status == this.NOTREADY) {
          this.getCallBackData();
        }
      }
    } else if (countActiveCalls == 1) {
      if ([this.TALKING, this.WRAP, this.READY, this.NOTREADY].includes(status)) {
        if (status == this.READY || status == this.NOTREADY) {
          this.btmsAction([
            { idx: 6, value: true },
            { idx: 7, value: false },
            { idx: 8, value: false },
            { idx: 9, value: false },
          ]);
        }
        if (status == this.WRAP) {
          this.canPowerOff(false);
        }
        canChange = true;
      }
    } else {
      canChange = true;
      if (talkingCount > 0) {
        canChange = true;
        status = this.TALKING;
      } else if (hangupCount > 0) {
        canChange = true;
        status = this.WRAP;
        this.canPowerOff(false);
      } else if (this.agent_status == this.WRAP) {
        canChange = true;
      }
    }

    if (this.agent_status == this.READY && status == this.WRAP) {
      canChange = false;
      this.playHangup();
      this.stopRing();
    }

    if (this.agent_status == this.TALKING && status == this.WRAP) {
      this.playHangup();
      this.stopRing();
      this.changeCustomerAgentStatus(this.agent_status, [this.WRAP]);
    }

    if ((canChange && this.agent_status != status) || (status == this.READY && out)) {

      if (this.agent_status == status) {
        return;
      }

      if (this.canTest || !out) {
        this.agent_status = status;
      }

      this.activeButtonsAction(status);
      this.onCheckActualCalls();

      /***
       * BTWCALLS 
       */

      // if (status == this.READY && this.urlbtwCalls != '') {
      //     if (this.urlbtwCalls != "NOTALLOWED") {
      //         // $(`#script${this.numberLines + 1}`).attr('src', this.urlbtwCalls);
      //         // $(`#script${this.numberLines + 1}`).removeClass("hide");
      //         $(`#script999`).attr('src', this.urlbtwCalls);
      //         $(`#script999`).removeClass("hide");
      //     }
      // }

      switch (status) {
        case this.READY:
        case this.NOTREADY:
        case this.BREAK:
        case this.BATHROOM:
        case this.MEETING:
        case this.LUNCH:
        case this.OTHER:
          if (this.pepper && out) {
            this.onSend('SETSTATUS', { status });
          }
          this.activateForceToReady = false;
          this.canPowerOff(true);
          break;
        case this.TALKING:
        case this.WRAP:
          // this.activeTimeWrapToReady();
          this.canPowerOff(false);
          break;
        case this.LOGOFF:
          this.canChangeStatus(false);
          return;
          break;
      }
    }
    return false;
  }

  sendPreviewCallResults = (data) => {
    if (data.option && data.option != "") {
      let params = {
        camp_id: data.camp_id,
        phone: data.phone,
        leadId: data.leadid,
        status: ""
      };
      let action = "";
      switch (data.option) {
        case this.CONFIRM:
          action = "OUTCALL";
          params.status = this.READY;
          break;
        case this.CANCEL:
          action = "RELEASERECORD";
          params.status = this.NOTREADY;
          break;
        case this.SKIP:
          action = "SKIPRECORD";
          params.status = this.READY;
          break;
      }
      this.onSend(action, params);
    }
  }

  checkScriptUrl = (id) => {
    let cont = "";
    try {
      // eval(`cont = $("#script${id}").attr("src")`);
    } catch (ex) {
      cont = "";
    }
    if (cont == "" || cont == "about:blank") {
      return 0;
    } else {
      return 1;
    }
  }

  activeButtonsAction = (status) => {
    // console.log(status)
    /**
     * btmsAction[0] => Manual Call
     * btmsAction[1] => HOLD
     * btmsAction[2] => RETRIEVE
     * btmsAction[3] => TRANSFER
     * btmsAction[4] => SENDDTMF
     * btmsAction[5] => BRIDGE
     * btmsAction[6] => CONFERENCE
     * btmsAction[7] => BREAKCONFERENCE
     * btmsAction[8] => RECALL
     * btmsAction[9] => HANGUP
     */
    let arr = [];
    switch (status) {
      case this.NOTREADY:
        this.btmsAction([
          { idx: 1, value: true },
          { idx: 2, value: false },
        ]);
        this.enableDisableButtonsAction([this.MANUALCALL]);
        this.canChangeStatus(true);
        this.onCheckActualCalls();
        if (this.actual_calls > 0) {
          this.canPowerOff(false);
        } else {
          this.canPowerOff(true);
          this.getCallBackData();
        }
        break;
      case this.READY:
      case this.BREAK:
      case this.BATHROOM:
      case this.MEETING:
      case this.LUNCH:
      case this.OTHER:
        this.enableDisableButtonsAction([]);
        this.canChangeStatus(true);
        this.canPowerOff(true);
        this.btmsAction([
          { idx: 1, value: true },
          { idx: 2, value: false },
        ]);
        break;
      case this.TALKING:
        this.btmsAction([
          { idx: 1, value: true },
          { idx: 2, value: false },
        ]);
        arr = this.validateStatusButtons([
          this.HOLD,
          this.RETRIEVE,
          this.TRANSFER,
          this.SENDDTMF,
          this.BRIDGE,
          this.CONFERENCE,
          this.DISCONNECT,
          this.BREAKCONFERENCE,
          this.RECALL,
          this.HANGUP,
        ]);
        this.enableDisableButtonsAction(arr);
        this.canChangeStatus(false);
        this.canPowerOff(false);
        break;
      case this.HOLD:
        this.btmsAction([
          { idx: 1, value: false },
          { idx: 2, value: true },
        ]);
        arr = this.validateStatusButtons([
          this.TALKING,
          this.HOLD,
          this.RETRIEVE,
          this.BRIDGE,
          this.CONFERENCE,
          this.TRANSFER,
        ]);
        this.enableDisableButtonsAction(arr);
        this.canChangeStatus(false);
        this.canPowerOff(false);
        break;
      case this.RETRIEVE:
        this.activeButtonsAction(this.TALKING);
        this.btmsAction([
          { idx: 1, value: true },
          { idx: 2, value: false },
        ]);
        arr = this.validateStatusButtons([
          this.HOLD,
          this.RETRIEVE,
          this.SENDDTMF,
          this.BRIDGE,
          this.CONFERENCE,
          this.TRANSFER,
          this.HANGUP,
        ]);
        this.enableDisableButtonsAction(arr);
        this.canChangeStatus(false);
        this.canPowerOff(false);
        break;
      case this.WRAP:
        this.enableDisableButtonsAction([]);
        this.canPowerOff(false);
        this.canChangeStatus(false);
        break;
      case this.LOGOFF:
        this.canChangeStatus(false);
        break;
      case this.HANGUP:
        this.canPowerOff(true);
        this.canChangeStatus(false);
        break;
      case this.CONF:
      case this.CONFERENCE:
        arr = this.validateStatusButtons([
          this.SENDDTMF,
          this.CONFERENCE,
          this.DISCONNECT,
          this.BREAKCONFERENCE,
          this.RECALL,
        ]);
        this.enableDisableButtonsAction(arr);
        break;
    }

  };

  enableDisableButtonsAction = (objs) => {
    let btm = [];
    this.buttonsAction.forEach((e, idx) => {
      if (objs.includes(e.ref)) {
        btm.push({ name: e.ref, value: false });
      } else {
        btm.push({ name: e.ref, value: true });
      }
    });
    this.dispatchEvent({ event: this.ACTIONBUTTONS, action: this.DISABLED, buttons: btm });
  };

  btmsAction = (objs = []) => {
    let btm = [];
    objs.forEach(e => {
      btm.push({ name: this.buttonsAction[e.idx].ref, value: e.value });
    })
    this.dispatchEvent({
      event: this.ACTIONBUTTONS, action: this.VISIBLE, buttons: btm
    });
    // this.dispatchEvent({
    //     event: this.ACTIONBUTTONS, action: this.VISIBLE, buttons: [
    //         { name: this.buttonsAction[idx].ref, value: !option }
    //     ]
    // });
  }

  validateStatusButtons(arr = []) {
    if (arr.length > 0) {
      arr.forEach((element, index) => {
        switch (element) {
          case this.BRIDGE:
            let count = 0;
            this.line.forEach((element) => {
              if (element.uniqueid != '') {
                count++;
              }
            });
            if (count != 2) {
              arr.splice(index, 1);
            }
            break;
          case this.CONFERENCE:
            try {
              if (this.line[this.actual_line - 1].data.allowConf == 0) {
                arr.splice(index, 1);
              }
            } catch (ex) {
              arr.splice(index, 1);
            }
            break;
        }
      });
    }
    // console.log(arr)
    return arr;
  }

  changeCallStatus = (line, nstatus) => {
    let idx = line - 1;
    this.line[idx].callstatus = nstatus;
    this.getRowData(idx);
  }

  funcHold = () => {
    let uniqueid = this.line[this.actual_line - 1].uniqueid;
    console.log("uniqueid", uniqueid)
    console.log("this.actual_line", this.actual_line)
    let action = '';
    if (this.line[this.actual_line - 1].callstatus == this.TALKING) {
      action = this.HOLD;
    } else {
      action = this.RETRIEVE;
    }
    if (uniqueid != '') {
      this.onSend(action, { uniqueid });
    } else {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `${action} - The uniqueID is empty` });
    }
  }

  funcTransfer = (type, data) => {
    if (data && data != '') {
      let phone = "";
      switch (type) {
        case this.AGENT:
          phone = `apq${data}`;
          break;
        case this.CAMPAIGN:
          phone = `_cmp${data}$$`;
          break;
        case this.PHONE:
          phone = data;
          break;
      }
      let uniqueid = this.line[this.actual_line - 1].uniqueid;
      this.onSend(this.TRANSFER, { uniqueid, number: phone });
    } else {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `The ${type} number cannot be empty` });
    }
  }

  funcDTMF = (data) => {
    if (data && data != '') {
      let uniqueid = this.line[this.actual_line - 1].uniqueid;
      this.onSend(this.SENDDTMF, { uniqueid, dtmf: data });
    } else {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `The DTMF cannot be empty` });
    }
  }

  funcBridge = (lines = []) => {
    if (lines.length != 2) {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `Bridge Error, You need to establish two active calls` });
      return;
    }
    let count = this.activeCalls();
    if (count >= 2) {
      uniqueid = "";
      let cuniqueid = [];
      let count = 0;
      this.line.forEach(e => {
        if (lines.includes(e.id)) {
          if (e.uniqueid != '' && [this.TALKING, this.HOLD].includes(e.callstatus)) {
            count++;
            cuniqueid.push(`uniqueid${count}: '${e.uniqueid}'`);
          }
        }
      });
      if (cuniqueid.length == 2) {
        let cmd = `this.onSend(this.BRIDGE, { ${cuniqueid.join(",")} });`;
        eval(cmd);
      } else {
        this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `Bridge Error, You need to establish two active calls` });
      }
    } else {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `Bridge Error, You need to establish two active calls` });
    }
  }

  funcConference = (lines = []) => {

    if (lines.length == 0) {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: `Conference Error, You need to establish a one or two active calls` });
      return;
    }

    let cLinesRealActive = this.onCheckAtualCalls(this.TALKING) + this.onCheckAtualCalls(this.HOLD);
    let uniqueid = null;

    switch (cLinesRealActive) {
      case 0:
        this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: "You cannot establish a conference if no active calls exist" });
        return;
        break;
      case 1:
        this.line.forEach(e => {
          if (lines.includes(e.id)) {
            if (e.uniqueid != '' && e.data.allowconf == 1 && [this.TALKING, this.HOLD].includes(e.callstatus)) {
              uniqueid = e.uniqueid;
            }
          }
        });
        if (uniqueid)
          this.onSend(this.CONFERENCE, { uniqueid1: uniqueid });
        break;
      default:
        uniqueid = "";
        let cuniqueid = [];
        let count = 0;
        this.line.forEach(e => {
          try {
            if (lines.includes(e.id)) {
              if (e.uniqueid != '' && e.data.allowConf == 1 && [this.TALKING, this.HOLD].includes(e.callstatus)) {
                count++;
                cuniqueid.push(`uniqueid${count}: '${e.uniqueid}'`);
              }
            }
          } catch (ex) { }
        });

        let cmd = `this.onSend(this.CONFERENCE, { ${cuniqueid.join(",")} });`;
        eval(cmd);
        break;
    }
    this.btmsAction([
      { idx: 6, value: false },
      { idx: 7, value: true },
    ]);
  };

  funcDisconnect = () => {
    let cLinesRealActive = this.onCheckAtualCalls('TALKING') + this.onCheckAtualCalls('HOLD') + this.onCheckAtualCalls('CONF') + this.onCheckAtualCalls('BRIDGE');
    let uniqueid1 = this.line[0].uniqueid;
    let uniqueid2 = this.line[1].uniqueid;

    if (this.dataExitConf != '') {
      this.onSend('DISCONNECT', { uniqueid: this.dataExitConf });
      this.dataExitConf = '';
    } else {
      switch (cLinesRealActive) {
        case 0:
          this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: "You cannot disconnect calls if no active calls exist" });
          return;
          break;
        case 1:
          if ((uniqueid1 = !'' && uniqueid2 == '')) {
            this.onSend('DISCONNECT', { uniqueid1: uniqueid1 });
          } else if (uniqueid1 == '' && uniqueid2 != '') {
            this.onSend('DISCONNECT', { uniqueid1: uniqueid2 });
          }
          break;
        case 2:
          this.onSend('DISCONNECT', { uniqueid1, uniqueid2 });
          break;
      }
    }

    this.line.forEach((element, idx) => {
      if (this.line[idx].callstatus != '') {
        this.line[idx].callstatus = 'HANGUP';
      }
    });
    this.updateCallData();
    this.setStatusAgent(this.WRAP);
    this.changeCustomerAgentStatus(this.WRAP, [this.WRAP])
  };

  funcBreakConference = () => {
    let cLinesRealActive =
      this.onCheckAtualCalls('TALKING') +
      this.onCheckAtualCalls('HOLD') +
      this.onCheckAtualCalls('CONF') +
      this.onCheckAtualCalls('BRIDGE');
    let uniqueid1 = this.line[0].uniqueid;
    let uniqueid2 = this.line[1].uniqueid;

    if (this.dataExitConf != '') {
      this.onSend(this.BREAKCONFERENCE, { uniqueid: this.dataExitConf });
      this.dataExitConf = '';
    } else {
      this.onSend(this.BREAKCONFERENCE, { uniqueid: uniqueid1 });
    }

    this.line.forEach((element, idx) => {
      if (idx == 0) {
        if (this.line[idx].callstatus != '') {
          this.line[idx].callstatus = this.HOLD;
        }
      } else {
        if (this.line[idx].callstatus != '') {
          this.line[idx].callstatus = this.HOLD;
        }
      }
    });
    this.btmsAction([
      { idx: 6, value: true },
      { idx: 7, value: false },
      { idx: 8, value: false },
      { idx: 9, value: false },
    ]);
  };

  funcReCall = () => {
    if (this.dataExitConf != '') {
      this.onSend(this.RECALL, { uniqueid: this.dataExitConf });
      this.dataExitConf = '';
    }
  };

  funcHangUp = () => {
    let uniqueid = this.line[this.actual_line - 1].uniqueid;
    if (uniqueid != '') {
      this.onSend(this.HANGUP, { uniqueid });
    } else {
      this.dispatchEvent({ event: this.LOG, type: this.ERROR, message: 'Hangup - Error uniqueid is empty' })
    }
    this.playHangup();
  };


  canChangeStatus = (opc) => {
    this.status_agent = !opc;
    this.dispatchEvent({ event: this.CANCHANGEAGENTSTATUS, disabled: this.status_agent })
  }

  canPowerOff = (opc) => {
    this.dispatchEvent({
      event: this.ACTIONBUTTONS, action: this.DISABLED, buttons: [
        { name: this.LOGOFF, value: !opc }
      ]
    });
  }

  onNoKeyAction = () => {
    this.activeLastAction = true;
    if (this.verifyWebRTCStatus() && this.pepper) {
      this.dispatchEvent({ event: this.LOG, type: this.INFO, message: "NOKEY - The WS lost the connectionID, reconnecting" });
      this.closeConn();
      this.cleanAllTimers();
      this.conn();
    }
  }



  onCheckAtualCalls(status = '') {
    let count = 0;
    if (status == '') {
      this.line.forEach((element) => {
        if (element.phone != '') {
          count++;
        }
      });
      this.actual_calls = count;
      if (count == 0) {
        this.generalTimerStatus_Calls = false;
      }
    } else {
      this.line.forEach((element) => {
        if (element.callstatus == status) {
          count++;
        }
      });
      return count;
    }
  }

  //#endregion METHODS



}