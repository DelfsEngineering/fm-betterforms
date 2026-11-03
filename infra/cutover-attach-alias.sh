#!/usr/bin/env bash
# Attach docs.klai.studio alias + ACM cert to the docs distribution. Run only when the cert is ISSUED. No DNS change.
# Uses the *.klai.studio wildcard cert: the docs.klai.studio-only cert failed CAA while docs still CNAMEs to GitBook (its CAA allows only letsencrypt/pki.goog/digicert).
set -euo pipefail
DIST=E13U0TYGFYECCK
CERT=arn:aws:acm:us-east-1:536237283731:certificate/294cd2a9-a1cd-49d5-ae4e-7d8061c88bf0
st=$(aws acm describe-certificate --region us-east-1 --certificate-arn $CERT --query Certificate.Status --output text)
[ "$st" = ISSUED ] || { echo "cert is $st, not ISSUED; aborting"; exit 1; }
aws cloudfront get-distribution-config --id $DIST > /tmp/dc.json
ETAG=$(jq -r .ETag /tmp/dc.json)
jq --arg c "$CERT" '.DistributionConfig | .Aliases={Quantity:1,Items:["docs.klai.studio"]} | .ViewerCertificate={ACMCertificateArn:$c,SSLSupportMethod:"sni-only",MinimumProtocolVersion:"TLSv1.2_2021",CertificateSource:"acm"}' /tmp/dc.json > /tmp/dc-new.json
aws cloudfront update-distribution --id $DIST --if-match "$ETAG" --distribution-config file:///tmp/dc-new.json --query 'Distribution.[Status,DistributionConfig.Aliases.Items[0]]' --output text
echo "Next (manual, not done here): point docs.klai.studio CNAME at drdf9aoh7ms9n.cloudfront.net in GoDaddy."
