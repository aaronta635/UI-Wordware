import React, { useState, useRef } from 'react'
import { Folder, FileText, Grid, Play, Share2, Lock, Plus, Globe, HelpCircle, Settings, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Component() {
  const [projectName, setProjectName] = useState("Untitled")
  const [flowName, setFlowName] = useState("Flow name")
  const [isPrivate, setIsPrivate] = useState(true)
  const [flowContent, setFlowContent] = useState("")
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const flowContentInputRef = useRef<HTMLTextAreaElement>(null)

  const handleFlowContentFocus = () => {
    setShowPlaceholder(false)
  }

  const handleFlowContentBlur = () => {
    if (!flowContent) {
      setShowPlaceholder(true)
    }
  }

  const handleRun = () => {
    setIsRunning(true)
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white p-4 shadow-md flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">YBoard</h1>
            <div className="flex space-x-2 mb-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><FileText className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>New flow</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><Folder className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>New Folder</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><Grid className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Templates</TooltipContent>
              </Tooltip>
            </div>
            <div className="space-y-2 mb-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Files
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Files</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    Runs
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Runs</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Deployments
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Deployments</TooltipContent>
              </Tooltip>
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold mb-2">Project Files</h2>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" /> Untitled
              </Button>
            </div>
          </div>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon"><HelpCircle className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Help</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="flex flex-col mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Input 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-2xl font-bold bg-transparent border-none p-0"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    {isPrivate ? <Lock className="h-4 w-4 mr-2" /> : <Globe className="h-4 w-4 mr-2" />}
                    {isPrivate ? 'Private' : 'Public'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Project visibility</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <h2 className="text-lg font-semibold mb-2">Who can view this project?</h2>
                    <RadioGroup defaultValue={isPrivate ? "private" : "public"} onValueChange={(value) => setIsPrivate(value === "private")}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public">Public</Label>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Anyone can view and fork this project</p>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private">Private</Label>
                      </div>
                      <p className="text-sm text-gray-500">Only users within your organization can view and fork this project</p>
                    </RadioGroup>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Input 
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="text-lg text-gray-500 bg-transparent border-none p-0"
            />
          </div>

          <div className="flex justify-end space-x-2 mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deploy App</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>This will create an app page you can share as well as an API endpoint</p>
                  <h3 className="font-semibold mt-4 mb-2">Visibility</h3>
                  <RadioGroup defaultValue="public">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public-app" />
                      <Label htmlFor="public-app">Public</Label>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-gray-500 mt-2">Public apps can be accessed by anyone, and might be featured in the explore page.</p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" onClick={handleRun}>Run</Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-1/2 sm:w-1/2">
                <SheetHeader>
                  <SheetTitle>Runner</SheetTitle>
                </SheetHeader>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm"><Play className="h-4 w-4" /></Button>
                    <span className="text-gray-500">Runner:</span>
                  </div>
                  <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
                <div className="mt-4">
                  <p>Flow output will be displayed here.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">INPUTS</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">+ ADD</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Input sets</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg">+</span>
                        <span className="text-gray-500">New input set</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p>This flow has no inputs.</p>
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" /> Click to add an input
                      </Button>
                      <p className="text-gray-500">Or select 'Run'</p>
                    </div>
                    <p className="text-gray-400 mt-4">Tip: Create another set of inputs for easy switching</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <textarea
                ref={flowContentInputRef}
                value={flowContent}
                onChange={(e) => setFlowContent(e.target.value)}
                onFocus={handleFlowContentFocus}
                onBlur={handleFlowContentBlur}
                className="w-full h-32 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showPlaceholder && (
                <div className="absolute top-2 left-2 text-gray-400 pointer-events-none">
                  Everything this line and below is part of your flow - press '/' for commands and '@' for variables
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
