# Phase 15: Deployment & DevOps - Tests

## Manual Verification Tests

### CI/CD Pipeline Tests

#### Test 1: GitHub Actions Workflow Execution
- **Objective**: Verify all CI workflows execute correctly
- **Steps**:
  1. Push a commit to main branch
  2. Navigate to GitHub Actions tab
  3. Observe "CI Pipeline" workflow trigger
  4. Wait for completion
- **Expected Results**:
  - Workflow triggers automatically
  - All jobs (lint, test, build, security) pass
  - Total execution time < 10 minutes
  - No failed steps
- **Pass Criteria**: All green checkmarks

#### Test 2: Production Deployment Trigger
- **Objective**: Verify production deployment on main merge
- **Steps**:
  1. Merge PR to main branch
  2. Monitor deployment workflow
  3. Check Vercel dashboard
  4. Verify live URL updates
- **Expected Results**:
  - Deployment starts within 30 seconds
  - Build completes successfully
  - Site is accessible at production URL
  - No downtime during deployment
- **Pass Criteria**: Site live with new changes

#### Test 3: Preview Deployment for PRs
- **Objective**: Verify preview deployments for pull requests
- **Steps**:
  1. Create PR from feature branch
  2. Check for preview URL comment
  3. Access preview URL
  4. Verify isolated environment
- **Expected Results**:
  - Preview URL generated within 2 minutes
  - URL posted as PR comment
  - Site fully functional
  - Separate from production data
- **Pass Criteria**: Working preview environment

#### Test 4: Rollback Procedure
- **Objective**: Verify rollback capability
- **Steps**:
  1. Identify previous stable deployment
  2. Trigger rollback via Vercel CLI
  3. Monitor rollback process
  4. Verify site reverts correctly
- **Expected Results**:
  - Rollback completes in < 2 minutes
  - Previous version becomes active
  - No data loss
  - Rollback logged in audit trail
- **Pass Criteria**: Successful reversion

#### Test 5: Environment Variable Management
- **Objective**: Verify env var configuration across environments
- **Steps**:
  1. Check Vercel dashboard for env vars
  2. Verify different values per environment
  3. Deploy to preview
  4. Confirm correct env vars applied
- **Expected Results**:
  - Production vars not exposed to preview
  - API endpoints point to correct environments
  - Secrets encrypted at rest
  - No hardcoded secrets in code
- **Pass Criteria**: Proper isolation

### Infrastructure Tests

#### Test 6: DNS Configuration
- **Objective**: Verify DNS setup for custom domain
- **Steps**:
  1. Run `dig sijil.com`
  2. Check A records
  3. Verify CNAME for www
  4. Test SSL certificate
- **Expected Results**:
  - A records point to Vercel IPs
  - www redirects to root domain
  - Valid SSL certificate
  - HTTPS enforced
- **Pass Criteria**: Proper DNS resolution

#### Test 7: CDN Cache Invalidation
- **Objective**: Verify cache invalidation on deploy
- **Steps**:
  1. Deploy new version
  2. Request static assets
  3. Check cache headers
  4. Verify new content served
- **Expected Results**:
  - Cache invalidated within 30 seconds
  - New asset versions served
  - Cache-Control headers present
  - Stale content not served
- **Pass Criteria**: Fresh content delivered

#### Test 8: Database Migration Execution
- **Objective**: Verify migrations run on deploy
- **Steps**:
  1. Add new migration file
  2. Trigger deployment
  3. Check migration logs
  4. Verify schema updated
- **Expected Results**:
  - Migrations run before app starts
  - Failed migrations block deployment
  - Rollback migrations available
  - Data preserved
- **Pass Criteria**: Schema updated correctly

#### Test 9: Health Check Endpoints
- **Objective**: Verify health check functionality
- **Steps**:
  1. Call `/api/health`
  2. Call `/api/ready`
  3. Call `/api/live`
  4. Check response codes
- **Expected Results**:
  - 200 OK when healthy
  - 503 when unhealthy
  - Response time < 100ms
  - Detailed status in body
- **Pass Criteria**: Accurate health reporting

#### Test 10: Log Aggregation
- **Objective**: Verify logs captured centrally
- **Steps**:
  1. Generate test log entries
  2. Check Axiom dashboard
  3. Search for test entries
  4. Verify log context
- **Expected Results**:
  - Logs appear within 10 seconds
  - Structured JSON format
  - Correlation IDs present
  - Error stack traces captured
- **Pass Criteria**: Complete log visibility

### Monitoring Tests

#### Test 11: Uptime Monitoring
- **Objective**: Verify uptime monitoring active
- **Steps**:
  1. Check Better Uptime dashboard
  2. Verify check frequency
  3. Test alert channels
  4. Review incident history
- **Expected Results**:
  - Checks every 1 minute
  - Alerts sent to Slack/email
  - Incident timeline recorded
  - Status page updated
- **Pass Criteria**: Reliable monitoring

#### Test 12: Performance Metrics Collection
- **Objective**: Verify Core Web Vitals tracking
- **Steps**:
  1. Browse site in Chrome
  2. Check Vercel Analytics
  3. View LCP, FID, CLS data
  4. Compare against thresholds
- **Expected Results**:
  - Real user metrics collected
  - Data aggregated by page
  - Historical trends visible
  - Alerts on degradation
- **Pass Criteria**: Complete metrics

#### Test 13: Error Tracking
- **Objective**: Verify error capture with Sentry
- **Steps**:
  1. Trigger test error
  2. Check Sentry dashboard
  3. Verify error details
  4. Test alert notification
- **Expected Results**:
  - Error captured within 5 seconds
  - Stack trace included
  - User context attached
  - Alert sent to team
- **Pass Criteria**: Full error visibility

#### Test 14: Custom Dashboard Creation
- **Objective**: Verify custom metric dashboards
- **Steps**:
  1. Define custom metric
  2. Emit metric from app
  3. Create dashboard panel
  4. Verify visualization
- **Expected Results**:
  - Metric appears in real-time
  - Graph renders correctly
  - Time range selectable
  - Export functionality works
- **Pass Criteria**: Custom metrics visible

#### Test 15: Alert Rule Configuration
- **Objective**: Verify alert rules trigger correctly
- **Steps**:
  1. Set threshold alert
  2. Simulate threshold breach
  3. Verify alert fires
  4. Test alert resolution
- **Expected Results**:
  - Alert fires within 1 minute
  - Correct channel notified
  - Alert includes context
  - Resolution acknowledged
- **Pass Criteria**: Reliable alerting

### Security Tests

#### Test 16: SSL/TLS Configuration
- **Objective**: Verify secure transport
- **Steps**:
  1. Run SSL Labs test
  2. Check TLS version
  3. Verify cipher suites
  4. Test HSTS header
- **Expected Results**:
  - A+ rating on SSL Labs
  - TLS 1.3 supported
  - Strong ciphers only
  - HSTS enabled
- **Pass Criteria**: A+ security rating

#### Test 17: Security Headers
- **Objective**: Verify security headers present
- **Steps**:
  1. Run securityheaders.com scan
  2. Check CSP header
  3. Verify X-Frame-Options
  4. Test Content-Type sniffing prevention
- **Expected Results**:
  - All recommended headers present
  - CSP configured correctly
  - Clickjacking prevented
  - MIME sniffing disabled
- **Pass Criteria**: A grade on scanner

#### Test 18: Dependency Vulnerability Scan
- **Objective**: Verify no known vulnerabilities
- **Steps**:
  1. Run `npm audit`
  2. Check Dependabot alerts
  3. Review Snyk report
  4. Fix any issues
- **Expected Results**:
  - Zero high/critical vulnerabilities
  - All dependencies up to date
  - Auto-fix PRs created
  - Audit passes in CI
- **Pass Criteria**: Clean audit report

#### Test 19: DDoS Protection
- **Objective**: Verify rate limiting active
- **Steps**:
  1. Send rapid requests
  2. Monitor response codes
  3. Check rate limit headers
  4. Verify IP blocking
- **Expected Results**:
  - 429 returned after limit
  - Retry-After header present
  - Legitimate traffic unaffected
  - Attack mitigated
- **Pass Criteria**: Rate limiting effective

#### Test 20: Backup Restoration
- **Objective**: Verify database backup restore
- **Steps**:
  1. Create test data
  2. Trigger backup
  3. Delete test data
  4. Restore from backup
- **Expected Results**:
  - Backup completes successfully
  - Restore completes in < 5 minutes
  - Data integrity maintained
  - Foreign keys preserved
- **Pass Criteria**: Successful restoration

### Regression Tests

#### Test 21: Deployment Frequency
- **Objective**: Verify deployment cadence
- **Steps**:
  1. Track deployments over week
  2. Count successful deploys
  3. Measure lead time
  4. Calculate success rate
- **Expected Results**:
  - Multiple deploys per day possible
  - Lead time < 1 hour
  - Success rate > 95%
  - Mean time to recovery < 10 minutes
- **Pass Criteria**: Agile deployment capability

#### Test 22: Zero-Downtime Deployment
- **Objective**: Verify no service interruption
- **Steps**:
  1. Start continuous requests
  2. Trigger deployment
  3. Monitor request success
  4. Check for errors
- **Expected Results**:
  - No 5xx errors during deploy
  - No connection refused
  - Session continuity maintained
  - WebSocket connections survive
- **Pass Criteria**: Zero downtime

#### Test 23: Multi-Region Availability
- **Objective**: Verify global availability
- **Steps**:
  1. Test from US endpoint
  2. Test from EU endpoint
  3. Test from Asia endpoint
  4. Compare latency
- **Expected Results**:
  - Site accessible from all regions
  - Latency < 200ms globally
  - Content cached locally
  - Failover works if region down
- **Pass Criteria**: Global accessibility

#### Test 24: Cost Monitoring
- **Objective**: Verify cost tracking accurate
- **Steps**:
  1. Check Vercel billing dashboard
  2. Review usage breakdown
  3. Set budget alerts
  4. Forecast monthly cost
- **Expected Results**:
  - Usage metrics accurate
  - Alerts fire at threshold
  - Cost per deployment visible
  - Optimization recommendations shown
- **Pass Criteria**: Cost visibility

#### Test 25: Documentation Accuracy
- **Objective**: Verify runbooks match reality
- **Steps**:
  1. Follow deployment runbook
  2. Execute rollback procedure
  3. Test incident response
  4. Update outdated steps
- **Expected Results**:
  - All steps executable
  - Commands work as written
  - Screenshots current
  - Contact info accurate
- **Pass Criteria**: Runbooks reliable

### API Verification Tests

#### Test 26: Health Check API
- **Endpoint**: GET /api/health
- **Expected Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "database": "connected",
    "cache": "connected",
    "queue": "connected"
  },
  "version": "1.0.0"
}
```
- **Validation**:
  - Status code: 200
  - Response time: < 100ms
  - All services reported
  - Version matches deployment

#### Test 27: Readiness Check API
- **Endpoint**: GET /api/ready
- **Expected Response**:
```json
{
  "ready": true,
  "checks": {
    "database_migrations": "complete",
    "cache_warmup": "complete"
  }
}
```
- **Validation**:
  - Status code: 200 when ready
  - Status code: 503 when not ready
  - All checks reported
  - Load balancer integration works

#### Test 28: Liveness Check API
- **Endpoint**: GET /api/live
- **Expected Response**:
```json
{
  "alive": true,
  "uptime": 86400
}
```
- **Validation**:
  - Status code: 200
  - Uptime in seconds
  - Kubernetes probe compatible
  - No external dependencies

#### Test 29: Metrics Endpoint
- **Endpoint**: GET /api/metrics
- **Expected Response**: Prometheus format
- **Validation**:
  - Metrics exposed
  - Correct format
  - All counters incrementing
  - Histograms recording

#### Test 30: Version Endpoint
- **Endpoint**: GET /api/version
- **Expected Response**:
```json
{
  "version": "1.0.0",
  "commit": "abc123",
  "buildTime": "2024-01-01T00:00:00Z",
  "environment": "production"
}
```
- **Validation**:
  - All fields present
  - Commit hash valid
  - Build time recent
  - Environment correct

### Edge Case Tests

#### Test 31: Concurrent Deployments
- **Objective**: Handle multiple simultaneous deploys
- **Steps**:
  1. Trigger two deployments simultaneously
  2. Monitor queue behavior
  3. Verify ordering
  4. Check final state
- **Expected Results**:
  - Deployments queued
  - Executed in order
  - No race conditions
  - Final state consistent
- **Pass Criteria**: Ordered execution

#### Test 32: Large Asset Deployment
- **Objective**: Deploy with large static assets
- **Steps**:
  1. Add 100MB of assets
  2. Trigger deployment
  3. Monitor upload progress
  4. Verify asset availability
- **Expected Results**:
  - Upload completes
  - Assets cached at edge
  - No timeout errors
  - Compression applied
- **Pass Criteria**: Large assets handled

#### Test 33: Database Connection Exhaustion
- **Objective**: Handle connection pool limits
- **Steps**:
  1. Simulate high load
  2. Monitor connections
  3. Verify queuing
  4. Check recovery
- **Expected Results**:
  - Connections pooled
  - Requests queued
  - No crashes
  - Graceful degradation
- **Pass Criteria**: Pool management

#### Test 34: Clock Skew Handling
- **Objective**: Handle server time differences
- **Steps**:
  1. Simulate clock skew
  2. Test JWT validation
  3. Check session expiry
  4. Verify logging timestamps
- **Expected Results**:
  - Tolerance for skew
  - NTP sync active
  - Logs consistent
  - Tokens valid
- **Pass Criteria**: Time handling

#### Test 35: Partial Deployment Failure
- **Objective**: Handle partial failure scenarios
- **Steps**:
  1. Simulate edge failure
  2. Monitor rollback
  3. Check consistency
  4. Verify user impact
- **Expected Results**:
  - Automatic rollback
  - Consistent state
  - Users unaffected
  - Alert triggered
- **Pass Criteria**: Failure handling

#### Test 36: Secret Rotation
- **Objective**: Rotate secrets without downtime
- **Steps**:
  1. Update secret in vault
  2. Trigger rolling update
  3. Verify new secret used
  4. Check old secret invalidated
- **Expected Results**:
  - Zero downtime
  - All instances updated
  - Old secret rejected
  - Audit log updated
- **Pass Criteria**: Seamless rotation

#### Test 37: Blue-Green Deployment
- **Objective**: Verify blue-green strategy
- **Steps**:
  1. Deploy to green slot
  2. Run smoke tests
  3. Switch traffic
  4. Monitor metrics
- **Expected Results**:
  - Instant traffic switch
  - Easy rollback
  - No mixed versions
  - Metrics compared
- **Pass Criteria**: Clean switchover

#### Test 38: Canary Release
- **Objective**: Verify canary deployment
- **Steps**:
  1. Deploy canary to 10%
  2. Monitor error rates
  3. Gradually increase
  4. Full rollout
- **Expected Results**:
  - Traffic split correctly
  - Metrics compared
  - Automatic halt on issues
  - Progressive delivery
- **Pass Criteria**: Controlled rollout

#### Test 39: Disaster Recovery Drill
- **Objective**: Test DR procedures
- **Steps**:
  1. Simulate region failure
  2. Activate DR site
  3. Verify data consistency
  4. Fail back to primary
- **Expected Results**:
  - RTO < 15 minutes
  - RPO < 5 minutes
  - Data intact
  - Procedures documented
- **Pass Criteria**: DR successful

#### Test 40: Certificate Renewal
- **Objective**: Verify auto-renewal of certificates
- **Steps**:
  1. Check certificate expiry
  2. Simulate renewal trigger
  3. Verify new certificate
  4. Test chain of trust
- **Expected Results**:
  - Auto-renewal works
  - No manual intervention
  - Chain valid
  - No downtime
- **Pass Criteria**: Continuous validity

### Performance Tests

#### Test 41: Cold Start Time
- **Objective**: Measure function cold start
- **Steps**:
  1. Invoke idle function
  2. Measure response time
  3. Repeat 10 times
  4. Calculate average
- **Expected Results**:
  - Cold start < 500ms
  - Warm start < 50ms
  - Consistent performance
  - No timeouts
- **Pass Criteria**: Fast startup

#### Test 42: Build Time Optimization
- **Objective**: Verify build efficiency
- **Steps**:
  1. Trigger clean build
  2. Measure duration
  3. Analyze bottlenecks
  4. Compare to baseline
- **Expected Results**:
  - Build < 5 minutes
  - Cache hit rate > 80%
  - Incremental builds fast
  - Parallelization effective
- **Pass Criteria**: Efficient builds

#### Test 43: Deployment Propagation
- **Objective**: Measure global propagation
- **Steps**:
  1. Deploy new version
  2. Test from multiple regions
  3. Record availability time
  4. Calculate propagation delay
- **Expected Results**:
  - Full propagation < 2 minutes
  - Consistent versions
  - No stale caches
  - Health checks pass
- **Pass Criteria**: Fast propagation

#### Test 44: Resource Utilization
- **Objective**: Monitor resource efficiency
- **Steps**:
  1. Deploy under load
  2. Monitor CPU/memory
  3. Check autoscaling
  4. Analyze costs
- **Expected Results**:
  - CPU < 70% average
  - Memory < 80%
  - Autoscaling responsive
  - Cost optimized
- **Pass Criteria**: Efficient resources

#### Test 45: Log Volume Handling
- **Objective**: Verify log ingestion capacity
- **Steps**:
  1. Generate high log volume
  2. Monitor ingestion rate
  3. Check for drops
  4. Verify search performance
- **Expected Results**:
  - No log drops
  - Ingestion keeps pace
  - Search remains fast
  - Storage sufficient
- **Pass Criteria**: Log capacity

## Acceptance Validation Checklist

- [ ] All CI/CD pipeline tests pass
- [ ] Infrastructure tests verify reliability
- [ ] Monitoring provides full visibility
- [ ] Security tests achieve A+ ratings
- [ ] Backup/restore procedures validated
- [ ] Zero-downtime deployments confirmed
- [ ] Global availability verified
- [ ] Cost monitoring active
- [ ] Documentation accurate
- [ ] Edge cases handled gracefully
- [ ] Performance targets met
- [ ] DR procedures tested
- [ ] Certificate management automated
- [ ] All API endpoints functional
- [ ] Rollback procedures verified
- [ ] Alert routing configured
- [ ] Compliance requirements met
- [ ] Team trained on procedures
- [ ] Runbooks executed successfully
- [ ] Post-mortem process defined
