---
title: Archiving email from Outlook and Apple Mail
---

This is my current strategy for archiving emails.

I have thousands of emails (sent and received) from the last couple of years. Before switching to the Mac more than 10 years ago, I was using Outlook with local PST files. Those files are huge as they have all attachments inside of them.

I do not have access to an old release of MS Outlook anymore and I don't want to start up Windows virtual machines just for looking up old emails. So the key question was how do I migrate and save those PST files into an open and more commonly used format?

## Step 1: Rescuing old PSTs

I did not want to buy any fancy tools like [O2M](https://www.littlemachines.com) for the Mac. After a bit of research I found the [libpst](http://www.five-ten-sg.com/libpst/) which includes the readpst command. It can be installed via macports. readpst can read Outlook PST files and output them as standard mbox files. Just what I needed.

```
$ readpst
ReadPST / LibPST v0.6.63
Little Endian implementation being used.
Usage: readpst [OPTIONS] {PST FILENAME}
OPTIONS:
        -V      - Version. Display program version
        -C charset      - character set for items with an unspecified character set
        -D      - Include deleted items in output
        -M      - Write emails in the MH (rfc822) format
        -S      - Separate. Write emails in the separate format
        -a <attachment-extension-list>  - Discard any attachment without an extension on the list
        -b      - Don't save RTF-Body attachments
        -c[v|l] - Set the Contact output mode. -cv = VCard, -cl = EMail list
        -d <filename>   - Debug to file.
        -e      - As with -M, but include extensions on output files
        -h      - Help. This screen
        -j <integer>    - Number of parallel jobs to run
        -k      - KMail. Output in kmail format
        -m      - As with -e, but write .msg files also
        -o <dirname>    - Output directory to write files to. CWD is changed *after* opening pst file
        -q      - Quiet. Only print error messages
        -r      - Recursive. Output in a recursive format
        -t[eajc]        - Set the output type list. e = email, a = attachment, j = journal, c = contact
        -u      - Thunderbird mode. Write two extra .size and .type files
        -w      - Overwrite any output mbox files

Only one of -M -S -e -k -m -r should be specified
```

I am not interested in archiving attachments so I deleted them with otion -a.

```bash
$ readpst -D -a xyz -o psttombox/ mylargeoutlookfile.pst
```

Readpst produces multiple PST files, one for every folder in the PST.
After that I deleted my old PST files. Another burden from my Windows past finally gone!

## Step 2: Archiving mails from Apple Mail

Yes, I am still using Apple Mail (maybe not much longer, because of some annoying IMAP issues). In my experience Apple Mail handles thousands of emails mostly without problems. So you could just import the mbox files from your old PSTs into Apple Mail and save them there and have them all ready for searching. But that method would not delete the attachments and of course creates huge Apple Mail folders on your local harddisk. And indexing and searching will become slower.

Once a year I export and delete emails from Apple Mail. I have my local mailboxes inside of Apple Mail organized by year. I keep the last 2 years inside of Apple Mail and export all other emails. So the next step was exporting emails out of Apple Mail. That's easy, as Apple Mail supports exporting in mbox format with the "Export" menu entry. It creates standard mbox files. After exporting I delete my archive mailboxes from Apple Mail to free space. Maybe that makes it run and search faster, too :-)

## Step 3: Split and merge

So now you would have multiple mbox files, created by readpst and Apple Mail. If you are happy with that you can just leave it this way.

But I took it a step further. I wanted to have yearly archives without any attachments.
I use [Mailsteward](http://www.mailsteward.com) for splitting and merging emails. Mailsteward can import and export mbox files and remove attachments. It can also merge databases. The free version has a max of 15.000 mails per database, which is enough for me.

After playing around with Mailsteward I now have Mailsteward database files for every year without any attachments.
