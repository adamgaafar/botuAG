"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./auth/auth.module");
var user_module_1 = require("./user/user.module");
var prisma_module_1 = require("./prisma/prisma.module");
var config_1 = require("@nestjs/config");
var task_service_1 = require("./task/task.service");
var job_service_1 = require("./job/job.service");
var cloud_region_service_1 = require("./cloud-region/cloud-region.service");
var cloud_credential_service_1 = require("./cloud-credential/cloud-credential.service");
var metric_service_1 = require("./metric/metric.service");
var task_controller_1 = require("./task/task.controller");
var job_controller_1 = require("./job/job.controller");
var cloud_region_controller_1 = require("./cloud-region/cloud-region.controller");
var cloud_credential_controller_1 = require("./cloud-credential/cloud-credential.controller");
var metric_controller_1 = require("./metric/metric.controller");
var ai_service_1 = require("./ai/ai.service");
var cicd_controller_1 = require("./cicd/cicd.controller");
var cicd_service_1 = require("./cicd/cicd.service");
var ai_controller_1 = require("./ai/ai.controller");
var cloud_controller_1 = require("./cloud/cloud.controller");
var cloud_service_1 = require("./cloud/cloud.service");
var monitoring_service_1 = require("./monitoring/monitoring.service");
var notifications_service_1 = require("./notifications/notifications.service");
var resource_service_1 = require("./resource/resource.service");
var deployment_gateway_1 = require("./deployment/deployment.gateway");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [auth_module_1.AuthModule, config_1.ConfigModule.forRoot(), user_module_1.UserModule, prisma_module_1.PrismaModule],
            controllers: [
                app_controller_1.AppController,
                task_controller_1.TaskController,
                job_controller_1.JobController,
                cloud_region_controller_1.CloudRegionController,
                cloud_credential_controller_1.CloudCredentialController,
                metric_controller_1.MetricController,
                cicd_controller_1.CICDController, // Add CICDController
                ai_controller_1.AIController, // Add AIController
                cloud_controller_1.CloudController, // Add CloudController
            ],
            providers: [
                app_service_1.AppService,
                task_service_1.TaskService,
                job_service_1.JobService,
                cloud_region_service_1.CloudRegionService,
                cloud_credential_service_1.CloudCredentialService,
                metric_service_1.MetricService,
                cicd_service_1.CICDService, // Add CICDService
                ai_service_1.AIService, // Add AIService
                cloud_service_1.CloudService, // Add CloudService
                monitoring_service_1.MonitoringService, // Add MonitoringService
                notifications_service_1.NotificationsService, // Add NotificationsService
                resource_service_1.ResourceService, // Add ResourceService
                deployment_gateway_1.DeploymentGateway, // Add DeploymentGateway
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
