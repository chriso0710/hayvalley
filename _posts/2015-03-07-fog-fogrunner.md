---
title: Playing around with the fog gem for AWS
---
This tool started as a little side and test project for managing our own AWS EC2 instances, domains and snapshots. It got more features as we went along and implemented some higher level features compared to the AWS CLI. I called it fogrunner and it is used in our AWS production environments since 2013.

fogrunner uses the awesome [fog](https://github.com/fog/fog) gem to access AWS. It might also be a good example, tutorial or starting point for the use of fog.

You can get the docs and source on github:
[Fogrunner](https://github.com/chriso0710/fogrunner){: .btn .btn--success}

## Features

* simple use via command line
* uses ENV or ~/.aws/config for AWS credentials
* handles multiple AWS regions
* lists detailed status of all your EC2 instances
* lists names und region of your S3 buckets
* lists all AWS regions
* scales your running EC2 instance with just one command (stops, sets new instance type, starts, allocates elastic IP)
* lists all Route53 DNS records, filter zones by regex
* bulk assign new A record IP in Route53
* lists snapshots for each instance
* bulk deletes snapshots, uses two different methods for keeping snapshot history
* debug mode

### Example

```shell
$ bundle exec ruby fogrunner.rb status
7 servers in region eu-west-1
i-XXXXXXXX nameA    : stopped t1.micro   eu-west-1b     
i-XXXXXXXX nameB    : stopped t1.micro   eu-west-1c     
i-XXXXXXXX nameC    : stopped c1.xlarge  eu-west-1c     
i-XXXXXXXX nameD    : running m1.xlarge  eu-west-1c      DNS/IP: XXXXXXXX.eu-west-1.compute.amazonaws.com (A.B.C.D)
i-XXXXXXXX nameE    : stopped t1.micro   eu-west-1b     
i-XXXXXXXX nameF    : running m3.large   eu-west-1a      DNS/IP: XXXXXXXX.eu-west-1.compute.amazonaws.com (A.B.C.D)
i-XXXXXXXX nameG    : running m1.small   eu-west-1b      DNS/IP: XXXXXXXX.eu-west-1.compute.amazonaws.com (A.B.C.D)
2 servers in region us-east-1
i-XXXXXXXX nameH    : running m1.small   us-east-1e      DNS/IP: XXXXXXXX.compute-1.amazonaws.com (A.B.C.D)
i-XXXXXXXX nameI    : stopped m1.medium  us-east-1a     
0 servers in region ap-southeast-1
0 servers in region ap-northeast-1
```

## Using AWS

fogrunner uses the following Fog classes for managing EC2 instances, S3 storage and Route53 configuration:

```
Fog::Compute
Fog::Storage
Fog::DNS
```

## Reusing AWS credentials

As you probably use multiple CLI tools for accessing AWS, you don't want every tool to manage it's own credentials.
fogrunner instead tries to reuse the profile section in the AWS CLI config file .aws/config or the AWS environment variables.

```ruby
  CONFIGPATH = ENV['HOME']+'/.aws/config'

  def credentials
      c = { :provider => 'AWS' }
      begin
          config = ParseConfig.new(CONFIGPATH)
      rescue Errno::EACCES
          config = nil
      end
      if @configsection && config && config[@configsection] then
          c.merge!( {
              :aws_access_key_id        => config[@configsection]['aws_access_key_id'],
              :aws_secret_access_key    => config[@configsection]['aws_secret_access_key'],
          } )
      elsif
          c.merge!( {
              :aws_access_key_id        => ENV['AWS_ACCESS_KEY'],
              :aws_secret_access_key    => ENV['AWS_SECRET_KEY'],
          } )
      end
      c
  end
```
