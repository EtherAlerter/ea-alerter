Feature: Status API
  In order to monitor the state of the alerter
  As a monitor process
  I want to watch the state

  Scenario: startup
    Given a running alerter
    Then the status endpoint will report that all is well
    And it will have no subscriptions
