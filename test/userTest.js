const User = require("../src/model/user");

const chai = require("chai");
const chaiHTTP =require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHTTP);

describe('User',()=>{
    beforeEach((done)=>{
        User.remove({},(err)=>{
            done();
        })
    })
    describe("/GET /",()=>{

        it("it should get the routes information",(done)=>{
            chai.request(server)
            .get("/")
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property("apiEndPoints");
                done();
            })
        });
    });
});