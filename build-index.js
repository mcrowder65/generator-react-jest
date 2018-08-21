"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");
var program = require("commander");

var _require = require("child_process"),
    exec = _require.exec;

var ora = require("ora");
var fs = require("fs-extra");

var packageJson = require("./package.json");

var deps = {
  dependencies: ["babel-runtime", "html-webpack-plugin", "prop-types", "express", "react", "react-dom", "react-router", "react-router-dom", "webpack", "node-sass", "history", "isomorphic-fetch"],
  devDependencies: ["babel-core", "babel-eslint", "babel-jest", "babel-loader", "babel-plugin-transform-async-to-generator", "babel-plugin-transform-class-properties", "babel-plugin-transform-es2015-modules-umd", "babel-plugin-transform-object-rest-spread", "babel-plugin-transform-runtime", "babel-plugin-syntax-dynamic-import", "babel-plugin-import", "babel-preset-env", "babel-preset-react", "babel-watch", "bundlesize", "compression-webpack-plugin", "copy-webpack-plugin", "css-loader", "enzyme", "enzyme-adapter-react-16", "eslint-config-mcrowder65", "jest", "fetch-mock", "style-loader", "shortid", "postcss-loader", "postcss-flexbugs-fixes", "sass-loader", "sw-precache-webpack-plugin", "react-hot-loader", "webpack-dev-server", "identity-obj-proxy", "webpack-bundle-analyzer", "webpack-manifest-plugin"]
};
var executeFunction = function executeFunction(func, loadingText) {
  var spinner = void 0;
  return new Promise(function (resolve, reject) {
    try {
      if (loadingText) {
        spinner = ora(loadingText).start();
      }
      func(function (error, output) {
        if (error) {
          spinner.fail(error.message);
          reject(error);
        } else {
          if (loadingText) {
            spinner.succeed();
          }
          resolve(output);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

var removeFolder = function removeFolder(folder) {
  return executeFunction(function (callback) {
    return fs.remove(folder, callback);
  }, "Removing " + folder);
};
var executeBashCommand = function executeBashCommand(command, loadingText) {
  return executeFunction(function (callback) {
    return exec(command, callback);
  }, loadingText);
};

var createFolder = function createFolder(folder) {
  return executeFunction(function (callback) {
    return fs.mkdir(folder, callback);
  }, "Creating " + folder);
};

var cli = function cli() {
  return new Promise(function (outerResolve, outerReject) {
    program.version(packageJson.version).arguments("<folder>").option("-y, --yarn", "Use yarn").option("-t, --travis", "Create .travis.yml file").option("-f, --force", "Removing your folder for good measure").option("-s, --skip", "Doesn't save to node_modules").option("-g, --git", "Does git init and creates .gitignore").action(function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(folder) {
        var fixPackageJson = function () {
          var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var pkgJson, dependencies, devDependencies, newPkg, mapDeps;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    mapDeps = function mapDeps(myDeps) {
                      var mattPkg = require("./package.json");
                      var combined = (0, _extends4.default)({}, mattPkg.devDependencies, mattPkg.dependencies);
                      return myDeps.reduce(function (accum, d) {
                        return (0, _extends4.default)({}, accum, (0, _defineProperty3.default)({}, d, combined[d]));
                      }, {});
                    };

                    _context.t0 = JSON;
                    _context.next = 4;
                    return readFile(folder + "/package.json", false);

                  case 4:
                    _context.t1 = _context.sent;
                    pkgJson = _context.t0.parse.call(_context.t0, _context.t1);
                    dependencies = deps.dependencies, devDependencies = deps.devDependencies;
                    newPkg = (0, _extends4.default)({}, pkgJson, {
                      dependencies: mapDeps(dependencies),
                      devDependencies: mapDeps(devDependencies),
                      eslintConfig: {
                        extends: ["mcrowder65"]
                      },
                      bundlesize: [{
                        path: "./build/*.bundle.js",
                        compression: "gzip",
                        maxSize: "100 kB"
                      }],
                      scripts: (0, _extends4.default)({}, pkgJson.scripts, {
                        start: "export NODE_ENV=development && ./node_modules/.bin/webpack-dev-server",
                        test: "npm run linter && npm run jest",
                        jest: "./node_modules/.bin/jest --coverage",
                        linter: "./node_modules/.bin/eslint src --ext .js,.jsx && ./node_modules/.bin/eslint test --ext .js,.jsx",
                        webpack: "export NODE_ENV=production && ./node_modules/.bin/webpack -p --progress",
                        bundlesize: "bundlesize",
                        "analyze-bundle": "export ANALYZE_BUNDLE=true && npm run webpack",
                        "server-watch": "NODE_ENV=development && babel-watch src/server/index.js"
                      }),
                      jest: (0, _extends4.default)({}, pkgJson.jest, {
                        setupTestFrameworkScriptFile: "<rootDir>/test/config.js",
                        moduleNameMapper: {
                          "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js",
                          "\\.(css|scss|less)$": "identity-obj-proxy"
                        },
                        collectCoverageFrom: ["src/**/*.{js*}", "index.js", "!src/client/browser-history.js", "!src/client/app.js", "!src/client/router.js", "!src/registerServiceWorker.js", "!src/server/index.js", "!src/client/pwa/manifest.json"],
                        modulePaths: ["src/"],
                        coverageReporters: ["html"]
                      })
                    });
                    _context.next = 10;
                    return writeFile(folder + "/package.json", JSON.stringify(newPkg, null, 2));

                  case 10:
                    if (!(process.platform === "win32")) {
                      _context.next = 14;
                      break;
                    }

                    displaySuccessMessage("Installation of node_modules will be skipped because windows is not supported for node_module installation on this cli.");
                    _context.next = 20;
                    break;

                  case 14:
                    if (!program.skip) {
                      _context.next = 18;
                      break;
                    }

                    displaySuccessMessage("Skipping installation of node_modules");
                    _context.next = 20;
                    break;

                  case 18:
                    _context.next = 20;
                    return execInFolder("" + install(), "Installing dependencies and devDependencies");

                  case 20:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function fixPackageJson() {
            return _ref2.apply(this, arguments);
          };
        }();

        var gitInit = function () {
          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var gitIgnore;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(process.platform === "win32")) {
                      _context2.next = 4;
                      break;
                    }

                    displaySuccessMessage("git initialization not supported on windows by this cli");
                    _context2.next = 10;
                    break;

                  case 4:
                    _context2.next = 6;
                    return execInFolder("git init", "git init");

                  case 6:
                    gitIgnore = "node_modules\ncoverage\nbuild\n.idea\nnpm-debug.log";
                    _context2.next = 9;
                    return writeFile(folder + "/.gitignore", gitIgnore);

                  case 9:
                    displaySuccessMessage(".gitignore created");

                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          return function gitInit() {
            return _ref3.apply(this, arguments);
          };
        }();

        var scaffold = function () {
          var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, f, file;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    files = ["webpack.config.js", ".babelrc", "src/registerServiceWorker.js", "src/client/pwa/logo.jpg", "src/client/pwa/manifest.json", "src/client/components/home.js", "src/client/components/__tests__/home.test.js", "src/client/app.js", "src/client/browser-history.js", "src/client/index.html", "src/client/router.js", "src/server/index.js", "src/shared/constants.js", "src/shared/fetch-wrapper.js", "src/shared/__tests__/fetch-wrapper.test.js", "src/shared/utils.js", "test/__mocks__/file-mock.js", "test/config.js"];
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context3.prev = 4;
                    _iterator = files[Symbol.iterator]();

                  case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context3.next = 23;
                      break;
                    }

                    f = _step.value;
                    _context3.prev = 8;
                    _context3.next = 11;
                    return readFile("./" + f);

                  case 11:
                    file = _context3.sent;
                    _context3.next = 14;
                    return writeFile(folder + "/" + f, file);

                  case 14:
                    _context3.next = 20;
                    break;

                  case 16:
                    _context3.prev = 16;
                    _context3.t0 = _context3["catch"](8);

                    // eslint-disable-next-line no-console
                    console.log(_context3.t0);
                    throw _context3.t0;

                  case 20:
                    _iteratorNormalCompletion = true;
                    _context3.next = 6;
                    break;

                  case 23:
                    _context3.next = 29;
                    break;

                  case 25:
                    _context3.prev = 25;
                    _context3.t1 = _context3["catch"](4);
                    _didIteratorError = true;
                    _iteratorError = _context3.t1;

                  case 29:
                    _context3.prev = 29;
                    _context3.prev = 30;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }

                  case 32:
                    _context3.prev = 32;

                    if (!_didIteratorError) {
                      _context3.next = 35;
                      break;
                    }

                    throw _iteratorError;

                  case 35:
                    return _context3.finish(32);

                  case 36:
                    return _context3.finish(29);

                  case 37:
                    displaySuccessMessage("Files scaffolded and placed");

                  case 38:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[4, 25, 29, 37], [8, 16], [30,, 32, 36]]);
          }));

          return function scaffold() {
            return _ref4.apply(this, arguments);
          };
        }();

        var createTravisFile = function () {
          var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var travisFile;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    travisFile = "\nlanguage: node_js\nnode_js: 8.9.4\nscript:\n- npm test;\n- npm run webpack;\n- npm run bundlesize;";
                    _context4.next = 3;
                    return writeFile(folder + "/.travis.yml", travisFile);

                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          return function createTravisFile() {
            return _ref5.apply(this, arguments);
          };
        }();

        var execInFolder, pkg, displaySuccessMessage, executeCmdInFolder, enterFolder, install, readFile, writeFile;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                writeFile = function writeFile(filename, content) {
                  return new Promise(function (resolve, reject) {
                    try {
                      var dirs = filename.split("/");
                      if (dirs) {
                        dirs.forEach(function (d, i) {
                          var dir = makeDir(d, i);
                          if (!fs.existsSync(dir) && d.indexOf(".") === -1) {
                            fs.mkdirSync(dir);
                          }
                          function makeDir(currentDirectory, index) {
                            return dirs.filter(function (di, ind) {
                              return ind <= index;
                            }).join("/");
                          }
                        });
                      }
                      fs.writeFile(filename, content, function (error) {
                        if (error) {
                          // eslint-disable-next-line no-console
                          console.log(error);
                          reject(error);
                        } else {
                          resolve();
                        }
                      });
                    } catch (error) {
                      // eslint-disable-next-line no-console
                      console.log(error);
                      reject(error);
                    }
                  });
                };

                readFile = function readFile(filename) {
                  var includeDirname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                  return new Promise(function (resolve, reject) {
                    fs.readFile("" + (includeDirname ? __dirname + "/" : "") + filename, "UTF-8", function (err, data) {
                      try {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(data);
                        }
                      } catch (error) {
                        reject(error);
                      }
                    });
                  });
                };

                install = function install() {
                  return program.yarn ? "yarn" : "npm install";
                };

                enterFolder = function enterFolder(str, post) {
                  return "cd " + folder + (post ? post : "") + " && " + str;
                };

                executeCmdInFolder = function executeCmdInFolder() {
                  return function (str, output) {
                    return executeBashCommand(enterFolder(str), output);
                  };
                };

                displaySuccessMessage = function displaySuccessMessage(message) {
                  var spinner = ora(message).start();
                  spinner.succeed();
                };

                execInFolder = void 0;
                _context5.prev = 7;

                if (!program.force) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 11;
                return removeFolder(folder);

              case 11:
                pkg = program.yarn ? "yarn" : "npm";

                if (program.yarn) {
                  displaySuccessMessage("Using yarn to install");
                }
                execInFolder = executeCmdInFolder();
                _context5.next = 16;
                return createFolder(folder);

              case 16:
                _context5.next = 18;
                return execInFolder(pkg + " init " + folder + " -y", pkg + " init " + folder + " -y");

              case 18:
                if (!program.git) {
                  _context5.next = 21;
                  break;
                }

                _context5.next = 21;
                return gitInit();

              case 21:
                if (!program.travis) {
                  _context5.next = 25;
                  break;
                }

                displaySuccessMessage("Created .travis.yml");
                _context5.next = 25;
                return createTravisFile();

              case 25:
                _context5.next = 27;
                return scaffold();

              case 27:
                _context5.next = 29;
                return fixPackageJson();

              case 29:
                outerResolve();
                _context5.next = 36;
                break;

              case 32:
                _context5.prev = 32;
                _context5.t0 = _context5["catch"](7);

                if (_context5.t0.message.indexOf("file already exists") !== -1) {
                  // eslint-disable-next-line no-console
                  console.error("You need to delete " + folder + ", or run again with -f");
                } else {
                  // eslint-disable-next-line no-console
                  console.error("Something went wrong, sorry");
                }
                outerReject(_context5.t0);

              case 36:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, undefined, [[7, 32]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()).parse(process.argv);
  });
};

exports.default = cli;
