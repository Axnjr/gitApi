const express = require("express");
const router = express.Router({ mergeParams: true })
const { Octokit } = require("@octokit/core");
const GITHUB_ACESS_TOKEN = process.env.GITHUB_ACESS_TOKEN || "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";
const octokit = new Octokit({ auth: GITHUB_ACESS_TOKEN });

const GitDataAsync = (name) => { return octokit.request(`GET /users/${name}/repos`) }

router.use("/" , (req,res) => {

	GitDataAsync(req.params.userName)
    .then((response) => 
        {
            if(response.data.filter(item => item.name===req.params.repoName).length===0)
                var ans = `User ${req.params.userName} has no repository named ${req.params.repoName} !!!`
            else
                var ans = response.data.filter(item => item.name===req.params.repoName)
            ;
            res.json(
            {
                "RESULT":ans,
                "TOTAL REPOSITORIES":response.data.length,
                "USER NAME SPECIFIED":req.params.userName,
                "REPOSITORY NAME SPECIFIED":req.params.repoName
            }
        )}
    )
    .catch(err => res.json(
        {
            ERROR:`Either user was not found or he/she does not has the repository you specified !!!`,
            STATUS:err.status,
            "USER NAME SPECIFIED":req.params.userName,
            "REPOSITORY NAME SPECIFIED":req.params.repoName,
            errrrr:err
        }
    ));

});

module.exports = { router }