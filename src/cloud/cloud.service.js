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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudService = void 0;
var common_1 = require("@nestjs/common");
var AWS = require("aws-sdk");
var fs = require("fs");
var path = require("path");
var unzipper = require("unzipper");
var simple_git_1 = require("simple-git");
// Azure and Google Cloud SDKs
var storage_blob_1 = require("@azure/storage-blob");
var storage_1 = require("@google-cloud/storage");
var CloudService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CloudService = _classThis = /** @class */ (function () {
        function CloudService_1(prisma) {
            this.prisma = prisma;
        }
        CloudService_1.prototype.integrateCloud = function (provider, credentials, regions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.cloudIntegration.create({
                            data: { provider: provider, credentials: credentials, regions: regions },
                        })];
                });
            });
        };
        CloudService_1.prototype.getCloudProviders = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.cloudIntegration.findMany()];
                });
            });
        };
        // Deployment Handler
        CloudService_1.prototype.deploy = function (file, repoLink, cloudProvider) {
            return __awaiter(this, void 0, void 0, function () {
                var isStatic, _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!file && !repoLink) {
                                throw new common_1.HttpException('Either a ZIP file or repository link must be provided', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.isStaticWebsite(repoLink)];
                        case 1:
                            isStatic = _b.sent();
                            if (!isStatic) return [3 /*break*/, 17];
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 15, , 16]);
                            _a = cloudProvider.toLowerCase();
                            switch (_a) {
                                case 'aws': return [3 /*break*/, 3];
                                case 'azure': return [3 /*break*/, 5];
                                case 'gcp': return [3 /*break*/, 7];
                                case 'github': return [3 /*break*/, 9];
                                case 'all': return [3 /*break*/, 11];
                            }
                            return [3 /*break*/, 13];
                        case 3:
                            this.validateAWSCredentials();
                            return [4 /*yield*/, this.deployStaticToS3(repoLink)];
                        case 4: return [2 /*return*/, _b.sent()];
                        case 5:
                            this.validateAzureCredentials();
                            return [4 /*yield*/, this.deployStaticToAzure(repoLink)];
                        case 6: return [2 /*return*/, _b.sent()];
                        case 7:
                            this.validateGCPCredentials();
                            return [4 /*yield*/, this.deployStaticToGCP(repoLink)];
                        case 8: return [2 /*return*/, _b.sent()];
                        case 9: return [4 /*yield*/, this.deployToGitHubPages(repoLink)];
                        case 10: return [2 /*return*/, _b.sent()];
                        case 11:
                            this.validateAWSCredentials();
                            this.validateAzureCredentials();
                            this.validateGCPCredentials();
                            return [4 /*yield*/, Promise.allSettled([
                                    this.deployStaticToS3(repoLink).catch(function (err) { return ({ provider: 'AWS', error: err.message }); }),
                                    this.deployStaticToAzure(repoLink).catch(function (err) { return ({ provider: 'Azure', error: err.message }); }),
                                    this.deployStaticToGCP(repoLink).catch(function (err) { return ({ provider: 'GCP', error: err.message }); }),
                                    this.deployToGitHubPages(repoLink).catch(function (err) { return ({ provider: 'GitHub', error: err.message }); }),
                                ]).then(function (results) {
                                    var errors = results.filter(function (result) { return result.status === 'rejected'; });
                                    if (errors.length > 0) {
                                        throw new common_1.HttpException(errors.map(function (err) { return err.reason || err; }).join(', '), common_1.HttpStatus.BAD_REQUEST);
                                    }
                                    return results.map(function (result) { return result.value; });
                                })];
                        case 12: return [2 /*return*/, _b.sent()];
                        case 13: throw new common_1.HttpException('Unsupported cloud provider', common_1.HttpStatus.BAD_REQUEST);
                        case 14: return [3 /*break*/, 16];
                        case 15:
                            error_1 = _b.sent();
                            throw new common_1.HttpException("Error deploying to ".concat(cloudProvider, ": ").concat(error_1.message), common_1.HttpStatus.BAD_REQUEST);
                        case 16: return [3 /*break*/, 18];
                        case 17: throw new common_1.HttpException('Only static websites are supported for now.', common_1.HttpStatus.BAD_REQUEST);
                        case 18: return [2 /*return*/];
                    }
                });
            });
        };
        CloudService_1.prototype.validateAWSCredentials = function () {
            var awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
            var awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
            var awsRegion = process.env.AWS_REGION;
            if (!awsAccessKeyId || !awsSecretAccessKey || !awsRegion) {
                throw new common_1.HttpException('AWS credentials are missing', common_1.HttpStatus.BAD_REQUEST);
            }
        };
        CloudService_1.prototype.validateAzureCredentials = function () {
            var connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
            if (!connectionString) {
                throw new common_1.HttpException('Azure Storage credentials are missing', common_1.HttpStatus.BAD_REQUEST);
            }
        };
        CloudService_1.prototype.validateGCPCredentials = function () {
            var gcpCredentials = process.env.GCP_CREDENTIALS;
            if (!gcpCredentials) {
                throw new common_1.HttpException('GCP credentials are missing', common_1.HttpStatus.BAD_REQUEST);
            }
        };
        CloudService_1.prototype.isStaticWebsite = function (repoLink) {
            return __awaiter(this, void 0, void 0, function () {
                var clonePath, git, hasIndexHtml, hasDockerfile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clonePath = path.join(__dirname, '../../clonedRepo', path.basename(repoLink));
                            if (fs.existsSync(clonePath)) {
                                fs.rmdirSync(clonePath, { recursive: true });
                            }
                            git = (0, simple_git_1.simpleGit)();
                            return [4 /*yield*/, git.clone(repoLink, clonePath)];
                        case 1:
                            _a.sent();
                            hasIndexHtml = fs.existsSync(path.join(clonePath, 'index.html'));
                            hasDockerfile = fs.existsSync(path.join(clonePath, 'Dockerfile'));
                            return [2 /*return*/, hasIndexHtml && !hasDockerfile];
                    }
                });
            });
        };
        // ✅ AWS S3 Deployment
        CloudService_1.prototype.deployStaticToS3 = function (repoLink) {
            return __awaiter(this, void 0, void 0, function () {
                var awsAccessKeyId, awsSecretAccessKey, awsRegion, s3, bucketName, clonePath, files, _i, files_1, file, filePath, fileContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
                            awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
                            awsRegion = process.env.AWS_REGION;
                            if (!awsAccessKeyId || !awsSecretAccessKey || !awsRegion) {
                                throw new common_1.HttpException('AWS credentials are missing', common_1.HttpStatus.BAD_REQUEST);
                            }
                            s3 = new AWS.S3();
                            bucketName = "static-site-".concat(Date.now());
                            return [4 /*yield*/, s3.createBucket({ Bucket: bucketName }).promise()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, s3.putBucketPolicy({
                                    Bucket: bucketName,
                                    Policy: JSON.stringify({
                                        Version: '2012-10-17',
                                        Statement: [{ Effect: 'Allow', Principal: '*', Action: 's3:GetObject', Resource: "arn:aws:s3:::".concat(bucketName, "/*") }],
                                    }),
                                }).promise()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, s3.putBucketWebsite({
                                    Bucket: bucketName,
                                    WebsiteConfiguration: { IndexDocument: { Suffix: 'index.html' }, ErrorDocument: { Key: 'error.html' } },
                                }).promise()];
                        case 3:
                            _a.sent();
                            clonePath = path.join(__dirname, '../../cloned-repos', path.basename(repoLink));
                            files = fs.readdirSync(clonePath);
                            _i = 0, files_1 = files;
                            _a.label = 4;
                        case 4:
                            if (!(_i < files_1.length)) return [3 /*break*/, 7];
                            file = files_1[_i];
                            filePath = path.join(clonePath, file);
                            fileContent = fs.readFileSync(filePath);
                            return [4 /*yield*/, s3.upload({ Bucket: bucketName, Key: file, Body: fileContent }).promise()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 4];
                        case 7: return [2 /*return*/, { message: 'Deployed to AWS S3', url: "http://".concat(bucketName, ".s3-website-").concat(process.env.AWS_REGION, ".amazonaws.com") }];
                    }
                });
            });
        };
        // ✅ Azure Blob Storage Deployment
        CloudService_1.prototype.deployStaticToAzure = function (repoLink) {
            return __awaiter(this, void 0, void 0, function () {
                var connectionString, blobServiceClient, containerName, containerClient, clonePath, files, _i, files_2, file, blobClient, filePath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
                            if (!connectionString) {
                                throw new common_1.HttpException('Azure Storage credentials are missing', common_1.HttpStatus.BAD_REQUEST);
                            }
                            blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
                            containerName = "static-site-".concat(Date.now());
                            containerClient = blobServiceClient.getContainerClient(containerName);
                            return [4 /*yield*/, containerClient.create({ access: 'blob' })];
                        case 1:
                            _a.sent();
                            clonePath = path.join(__dirname, '../../cloned-repos', path.basename(repoLink));
                            files = fs.readdirSync(clonePath);
                            _i = 0, files_2 = files;
                            _a.label = 2;
                        case 2:
                            if (!(_i < files_2.length)) return [3 /*break*/, 5];
                            file = files_2[_i];
                            blobClient = containerClient.getBlockBlobClient(file);
                            filePath = path.join(clonePath, file);
                            return [4 /*yield*/, blobClient.uploadFile(filePath)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, { message: 'Deployed to Azure Storage', url: "https://".concat(process.env.AZURE_STORAGE_ACCOUNT, ".blob.core.windows.net/").concat(containerName, "/index.html") }];
                    }
                });
            });
        };
        // ✅ Google Cloud Storage Deployment
        CloudService_1.prototype.deployStaticToGCP = function (repoLink) {
            return __awaiter(this, void 0, void 0, function () {
                var gcpCredentials, storage, bucketName, bucket, clonePath, files, _i, files_3, file;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gcpCredentials = process.env.GCP_CREDENTIALS;
                            if (!gcpCredentials) {
                                throw new common_1.HttpException('GCP credentials are missing', common_1.HttpStatus.BAD_REQUEST);
                            }
                            storage = new storage_1.Storage();
                            bucketName = "static-site-".concat(Date.now());
                            return [4 /*yield*/, storage.createBucket(bucketName)];
                        case 1:
                            bucket = _a.sent();
                            clonePath = path.join(__dirname, '../../cloned-repos', path.basename(repoLink));
                            files = fs.readdirSync(clonePath);
                            _i = 0, files_3 = files;
                            _a.label = 2;
                        case 2:
                            if (!(_i < files_3.length)) return [3 /*break*/, 5];
                            file = files_3[_i];
                            return [4 /*yield*/, storage.bucket(bucketName).upload(path.join(clonePath, file))];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, storage.bucket(bucketName).makePublic()];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, { message: 'Deployed to GCP Storage', url: "https://storage.googleapis.com/".concat(bucketName, "/index.html") }];
                    }
                });
            });
        };
        // ✅ GitHub Pages Deployment
        CloudService_1.prototype.deployToGitHubPages = function (repoLink) {
            return __awaiter(this, void 0, void 0, function () {
                var githubToken, githubUsername, clonePath, git;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            githubToken = process.env.GITHUB_TOKEN;
                            githubUsername = process.env.GITHUB_USERNAME;
                            if (!githubToken || !githubUsername) {
                                throw new common_1.HttpException('GitHub credentials are missing', common_1.HttpStatus.BAD_REQUEST);
                            }
                            clonePath = path.join(__dirname, '../../cloned-repos', path.basename(repoLink));
                            git = (0, simple_git_1.simpleGit)(clonePath);
                            if (!!fs.existsSync(clonePath)) return [3 /*break*/, 2];
                            return [4 /*yield*/, git.clone(repoLink, clonePath)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: 
                        // Configure GitHub credentials
                        return [4 /*yield*/, git.addConfig('user.name', githubUsername)];
                        case 3:
                            // Configure GitHub credentials
                            _a.sent();
                            return [4 /*yield*/, git.addConfig('user.email', "".concat(githubUsername, "@users.noreply.github.com"))];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, git.addConfig('http.extraheader', "Authorization: Bearer ".concat(githubToken))];
                        case 5:
                            _a.sent();
                            // Add, commit, and push changes to the `gh-pages` branch
                            return [4 /*yield*/, git.checkout('gh-pages').catch(function () { return git.checkoutLocalBranch('gh-pages'); })];
                        case 6:
                            // Add, commit, and push changes to the `gh-pages` branch
                            _a.sent();
                            return [4 /*yield*/, git.add('.')];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, git.commit('Deploy to GitHub Pages')];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, git.push('origin', 'gh-pages', { '--force': null })];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, { message: 'Deployed to GitHub Pages', url: "https://".concat(githubUsername, ".github.io/").concat(path.basename(repoLink, '.git'), "/") }];
                    }
                });
            });
        };
        // ✅ Handle ZIP file deployment
        CloudService_1.prototype.deployFromZip = function (file, cloudProvider) {
            return __awaiter(this, void 0, void 0, function () {
                var uploadPath, extractPath, hasIndexHtml;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uploadPath = path.join(__dirname, '../../uploads', file.originalname);
                            // Save the uploaded file
                            fs.writeFileSync(uploadPath, file.buffer);
                            extractPath = path.join(__dirname, '../../extracted', path.basename(file.originalname, '.zip'));
                            return [4 /*yield*/, fs.createReadStream(uploadPath).pipe(unzipper.Extract({ path: extractPath })).promise()];
                        case 1:
                            _a.sent();
                            hasIndexHtml = fs.existsSync(path.join(extractPath, 'index.html'));
                            if (!hasIndexHtml) {
                                throw new common_1.HttpException('Uploaded ZIP does not contain a static website', common_1.HttpStatus.BAD_REQUEST);
                            }
                            // Deploy to the selected cloud provider
                            return [2 /*return*/, this.deploy(null, extractPath, cloudProvider)]; // Pass cloudProvider
                    }
                });
            });
        };
        // ✅ Handle GitHub repository deployment
        CloudService_1.prototype.deployFromGitHub = function (repoUrl, cloudProvider) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.deploy(null, repoUrl, cloudProvider)]; // Pass cloudProvider
                });
            });
        };
        return CloudService_1;
    }());
    __setFunctionName(_classThis, "CloudService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CloudService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CloudService = _classThis;
}();
exports.CloudService = CloudService;
